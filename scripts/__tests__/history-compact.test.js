'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { compact } = require('../history-compact');

function makeRepo(mainContent) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'moodora-history-'));
  fs.mkdirSync(path.join(root, 'history'), { recursive: true });
  if (mainContent !== undefined) {
    fs.writeFileSync(path.join(root, 'history', 'HISTORY.md'), mainContent, 'utf8');
  }
  return root;
}

const entry = (date, name) => `### ${date} — ${name}\n- did ${name}`;

describe('history compaction', () => {
  it('archives old entries and keeps the newest ones', () => {
    const root = makeRepo(
      [
        '# History',
        '',
        '## Session log',
        '',
        entry('2026-10-01', 'one'),
        '',
        entry('2026-10-02', 'two'),
        '',
        entry('2026-10-03', 'three'),
        '',
        entry('2026-10-04', 'four'),
        '',
        entry('2026-10-05', 'five'),
        '',
      ].join('\n'),
    );

    const result = compact({
      root,
      maxEntries: 3,
      maxMainLines: 10000,
      maxMainBytes: 1000000,
      maxFolderBytes: 1000000,
    });

    const main = fs.readFileSync(path.join(root, 'history', 'HISTORY.md'), 'utf8');
    const archive = fs.readFileSync(path.join(root, 'history', 'archive', '2026-10.md'), 'utf8');

    expect(result.compacted).toBe(3);
    expect(archive).toContain('did one');
    expect(archive).toContain('did three');
    expect(archive).not.toContain('did four');
    expect(main).toContain('did four');
    expect(main).toContain('did five');
    expect(main).not.toContain('did one');
    expect(main).toContain('Older sessions are archived');
    expect(main.startsWith('# History')).toBe(true);
  });

  it('compresses the oldest archives when the folder grows too large', () => {
    const root = makeRepo('# History\n\n## Session log\n\n');
    const archiveDir = path.join(root, 'history', 'archive');
    fs.mkdirSync(archiveDir, { recursive: true });
    const old = path.join(archiveDir, '2025-01.md');
    const recent = path.join(archiveDir, '2025-02.md');
    fs.writeFileSync(old, 'x'.repeat(5000), 'utf8');
    fs.writeFileSync(recent, 'y'.repeat(5000), 'utf8');
    const past = new Date('2026-01-01T00:00:00Z');
    fs.utimesSync(old, past, past);

    const result = compact({
      root,
      maxEntries: 100,
      maxFolderBytes: 6000,
      archiveAgeDays: 30,
      now: new Date('2026-10-29T00:00:00Z').getTime(),
    });

    expect(result.compressed).toHaveLength(1);
    expect(fs.existsSync(`${old}.gz`)).toBe(true);
    expect(fs.existsSync(old)).toBe(false);
    expect(fs.existsSync(recent)).toBe(true);
  });

  it('does nothing for a small log', () => {
    const root = makeRepo(`# History\n\n## Session log\n\n${entry('2026-10-29', 'small')}\n`);
    const before = fs.readFileSync(path.join(root, 'history', 'HISTORY.md'), 'utf8');

    const result = compact({ root, maxFolderBytes: 1000000 });

    expect(result.changed).toBe(false);
    expect(fs.readFileSync(path.join(root, 'history', 'HISTORY.md'), 'utf8')).toBe(before);
  });
});
