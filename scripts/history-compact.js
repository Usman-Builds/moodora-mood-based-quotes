#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execFileSync } = require('child_process');

const DEFAULTS = {
  maxEntries: 12,
  keepEntries: 2,
  maxMainLines: 250,
  maxMainBytes: 48 * 1024,
  maxFolderBytes: 200 * 1024,
  archiveAgeDays: 90,
};

function splitLog(content) {
  const entryRe = /^### .*$/gm;
  const starts = [];
  let match;
  while ((match = entryRe.exec(content)) !== null) {
    starts.push(match.index);
  }

  if (starts.length === 0) {
    return { preamble: content.trimEnd(), entries: [] };
  }

  const preamble = content.slice(0, starts[0]).trimEnd();
  const entries = starts.map((start, i) => {
    const end = i + 1 < starts.length ? starts[i + 1] : content.length;
    const text = content.slice(start, end).trimEnd();
    const dateMatch = /^### (\d{4})-(\d{2})-\d{2}/.exec(text);
    return {
      text,
      date: dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : null,
      month: dateMatch ? `${dateMatch[1]}-${dateMatch[2]}` : 'undated',
    };
  });

  return { preamble, entries };
}

function insertArchivePointer(preamble) {
  const pointer =
    '> Older sessions are archived in `history/archive/` (`.md.gz` files are compressed; decompress with `gzip -d`).';
  if (preamble.includes('Older sessions are archived in')) {
    return preamble;
  }
  const lines = preamble.split('\n');
  const index = lines.findIndex(line => line.startsWith('## Session log'));
  if (index === -1) {
    return `${preamble}\n\n${pointer}`;
  }
  lines.splice(index + 1, 0, '', pointer);
  return lines.join('\n');
}

function appendToArchive(root, month, entries) {
  const dir = path.join(root, 'history', 'archive');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${month}.md`);
  const header = `# Session archive — ${month}\n`;
  const body = entries.map(entry => entry.text).join('\n\n');
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `${header}\n${body}\n\n`, 'utf8');
  } else {
    fs.appendFileSync(file, `\n${body}\n\n`, 'utf8');
  }
  return file;
}

function listArchives(root) {
  const dir = path.join(root, 'history', 'archive');
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter(name => /^\d{4}-\d{2}\.md$/.test(name))
    .map(name => {
      const file = path.join(dir, name);
      const stat = fs.statSync(file);
      return { file, size: stat.size, mtime: stat.mtimeMs, month: name.slice(0, 7) };
    })
    .sort((a, b) => a.month.localeCompare(b.month));
}

function folderBytes(root) {
  const dir = path.join(root, 'history');
  if (!fs.existsSync(dir)) {
    return 0;
  }
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile()) {
      total += fs.statSync(path.join(dir, entry.name)).size;
    } else if (entry.isDirectory()) {
      for (const child of fs.readdirSync(path.join(dir, entry.name))) {
        total += fs.statSync(path.join(dir, entry.name, child)).size;
      }
    }
  }
  return total;
}

function compressOldArchives(root, options, now) {
  const limit = options.maxFolderBytes;
  let size = folderBytes(root);
  if (size <= limit) {
    return [];
  }

  const archives = listArchives(root);
  const ageMs = options.archiveAgeDays * 24 * 60 * 60 * 1000;
  const newest = archives[archives.length - 1];
  const candidates = archives
    .filter(file => file !== newest)
    .sort((a, b) => a.month.localeCompare(b.month));

  const aged = candidates.filter(file => now - file.mtime >= ageMs);
  const pool = aged.length > 0 ? aged : candidates;
  const compressed = [];

  for (const file of pool) {
    if (size <= limit) {
      break;
    }
    const gzFile = `${file.file}.gz`;
    const gz = zlib.gzipSync(fs.readFileSync(file.file));
    fs.writeFileSync(gzFile, gz);
    fs.unlinkSync(file.file);
    size -= file.size - gz.length;
    compressed.push(gzFile);
  }

  return compressed;
}

function compact(options = {}) {
  const settings = { ...DEFAULTS, ...options };
  const root = settings.root || process.cwd();
  const mainFile = path.join(root, 'history', 'HISTORY.md');
  if (!fs.existsSync(mainFile)) {
    return { compacted: 0, compressed: [], changed: false };
  }

  const content = fs.readFileSync(mainFile, 'utf8');
  const { preamble, entries } = splitLog(content);
  const lines = content.split('\n').length;
  const bytes = fs.statSync(mainFile).size;
  const tooBig =
    entries.length > settings.maxEntries ||
    lines > settings.maxMainLines ||
    bytes > settings.maxMainBytes;

  const compressed = compressOldArchives(root, settings, settings.now || Date.now());
  let compacted = 0;

  if (tooBig && entries.length > settings.keepEntries) {
    const movable = entries.slice(0, entries.length - settings.keepEntries);
    const remaining = entries.slice(entries.length - settings.keepEntries);
    const byMonth = new Map();
    for (const entry of movable) {
      if (!byMonth.has(entry.month)) {
        byMonth.set(entry.month, []);
      }
      byMonth.get(entry.month).push(entry);
    }
    for (const [month, group] of byMonth) {
      appendToArchive(root, month, group);
    }
    const nextPreamble = insertArchivePointer(preamble);
    const nextContent = `${nextPreamble}\n\n${remaining.map(entry => entry.text).join('\n\n')}\n`;
    fs.writeFileSync(mainFile, nextContent, 'utf8');
    compacted = movable.length;
  }

  const changed = compacted > 0 || compressed.length > 0;
  if (settings.dryRun) {
    return { compacted, compressed, changed };
  }

  if (changed && settings.stage) {
    execFileSync('git', ['add', 'history'], { cwd: root, stdio: 'ignore' });
  }

  return { compacted, compressed, changed };
}

function main() {
  const args = process.argv.slice(2);
  const result = compact({
    dryRun: args.includes('--dry-run'),
    stage: args.includes('--stage'),
  });

  const parts = [];
  if (result.compacted > 0) {
    parts.push(`archived ${result.compacted} session entr${result.compacted === 1 ? 'y' : 'ies'}`);
  }
  if (result.compressed.length > 0) {
    parts.push(`compressed ${result.compressed.length} archive file(s)`);
  }
  if (parts.length === 0) {
    console.log('history: nothing to compact');
  } else {
    console.log(`history: ${parts.join(', ')}`);
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`history: ${error.message}`);
    process.exit(1);
  }
}

module.exports = { compact, splitLog, DEFAULTS };
