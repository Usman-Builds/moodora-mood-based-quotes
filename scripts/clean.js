const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const args = new Set(process.argv.slice(2));
const includeNodeModules = args.has('--node-modules') || args.has('--all');

const targets = [
  '.build',
  '.cache',
  'coverage',
  'android/.gradle',
  'android/build',
  'android/app/build',
  'android/app/.cxx',
  'ios/build',
  'ios/Pods',
  'ios/Podfile.lock',
  'ios/.xcode.env.local',
];

if (includeNodeModules) {
  targets.push('node_modules');
}

let removed = 0;

for (const relative of targets) {
  const target = path.join(projectRoot, relative);
  if (!fs.existsSync(target)) {
    continue;
  }
  fs.rmSync(target, { recursive: true, force: true });
  console.log(`removed ${relative}`);
  removed += 1;
}

console.log(`\ncleaned ${removed} path(s) in ${projectRoot}`);

if (includeNodeModules) {
  console.log('node_modules removed. Run `npm ci` before building again.');
  console.log(
    'For iOS also run `cd ios && bundle exec pod install` on macOS.',
  );
} else {
  console.log('Run with --node-modules (or --all) to also remove node_modules.');
}

console.log('Tip: start Metro with `npm run start:reset` to clear its cache.');
