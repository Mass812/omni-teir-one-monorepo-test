#!node

import { existsSync } from 'fs';
import { join, relative } from 'path';
import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPackagesSync } from '@lerna/project';
import { spawnStreaming } from '@lerna/child-process';
import process from 'node:process';
// get project root
const root = process.cwd();

const pathData = path.basename(process.cwd());
const pathDataSafer = path.basename(path.resolve(process.cwd()));

console.log('\x1b[36m', { pathData }, { pathDataSafer }, '\x1b[0m');

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __folderName = path.dirname(__filename);
console.warn('__filename: ', __filename);
console.warn('__folderName: ', __folderName);

// remove root from path
const absolutePath = __filename.split('packages/');
const formPath = __filename.slice(0, absolutePath.length);

const newFormedPath = pathDataSafer;
console.log('\x1b[31m', { newFormedPath }, '\x1b[0m');

console.log(
  '\x1b[36m',
  { absolutePath },
  { formPath },
  absolutePath.length,
  { root },
  '\x1b[0m'
);

const packages = getPackagesSync();

packages.forEach((pkg) => {
  const patches = join(pkg.location, 'patches');
  if (existsSync(patches)) {
    const nmPatchModuleIndex = require.resolve('patch-package');
    const relPath = relative(__folderName, patches);
    const packageWithPatch = pkg.location.split('/').reverse()[0];

    console.log(
      '\x1b[36m',
      'patches found in ==> : ',
      `${packageWithPatch} @ ${relPath}`,
      '\x1b[0m'
    );
    // console.log(
    //   '\x1b[36m',
    //   'patches found in ==> : ',
    //   `${packageWithPatch} @ ${relPath}`,
    //   {
    //     __filename,
    //     __folderName,
    //     absolutePath,
    //     formPath,
    //     root,
    //     pkg: pkg,
    //     patches,
    //     nmPatchModuleIndex,
    //     relPath,
    //     packageWithPatch,
    //   },
    //   '\x1b[0m'
    // );
    // spawnStreaming('node', [nmPatchModuleIndex, '--patch-dir', `${relPath}`], {
    //   shell: true,
    // });
  }
});