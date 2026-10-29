#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function git(args, options = {}) {
  return execFileSync('git', args, { encoding: 'utf8', ...options }).trim();
}

function main() {
  let root;
  try {
    root = git(['rev-parse', '--show-toplevel']);
  } catch (error) {
    return;
  }

  const hookDir = path.join(root, '.githooks');
  if (!fs.existsSync(path.join(hookDir, 'pre-commit'))) {
    return;
  }

  const current = (() => {
    try {
      return git(['config', '--get', 'core.hooksPath'], { cwd: root });
    } catch (error) {
      return '';
    }
  })();

  if (current === '.githooks') {
    return;
  }

  git(['config', 'core.hooksPath', '.githooks'], { cwd: root });

  try {
    fs.chmodSync(path.join(hookDir, 'pre-commit'), 0o755);
  } catch (error) {
    // chmod is a no-op on Windows
  }

  console.log('Installed git hooks (core.hooksPath = .githooks)');
}

if (require.main === module) {
  main();
}

module.exports = { main };
