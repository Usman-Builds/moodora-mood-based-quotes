const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const platform = process.argv[2];

if (platform !== 'android' && platform !== 'ios') {
  console.error('Usage: node scripts/bundle.js <android|ios>');
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, '..');
const outputDirectory = path.join(projectRoot, '.build', platform);
const bundleName =
  platform === 'android' ? 'index.android.bundle' : 'main.jsbundle';

fs.mkdirSync(outputDirectory, { recursive: true });

const result = spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  [
    'react-native',
    'bundle',
    '--platform',
    platform,
    '--dev',
    'false',
    '--entry-file',
    'index.js',
    '--bundle-output',
    path.join(outputDirectory, bundleName),
    '--assets-dest',
    outputDirectory,
  ],
  {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: false,
  },
);

process.exit(result.status ?? 1);
