#!node
/* eslint-disable no-undef */

import process from 'node:process';
import fs from 'node:fs';

// get project root
const rooted = process.cwd();

// to run this in ROOT run the command node generate some-service

// get service name
const serviceName = process.argv[2] ?? process.env.SERVICE_NAME;
console.log('\x1b[36m', process.env.SERVICE_NAME, '\x1b[0m');
const packageName = `@ts-os/${serviceName}`;
process.emit();
// directories
const root = './scripts';
const serviceRoot = `${rooted}/${root}/${process.argv[2]}`;
const testDir = `${serviceRoot}/__test__`;
const libDir = `${serviceRoot}/lib`;
const srcDir = `${libDir}/src`;

if (!serviceName) {
  // eslint-disable-next-line no-undef
  console.log('\x1b[31m', 'please provide a service name');
  process.exit();
}
// create folders
if (!fs.existsSync(serviceRoot)) {
  fs.mkdirSync(serviceRoot);
}
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir);
}
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir);
}
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir);
}
// create files
const indexFilePath = `${libDir}/index.ts`;
const testFilePath = `${testDir}/index.test.ts`;
const srcFilePath = `${srcDir}/index.ts`;
const packageFilePath = `${serviceRoot}/package.json`;
const readmeFilePath = `${serviceRoot}/README.md`;
const npmrcFilePath = `${serviceRoot}/.nvmrc`;
const tsConfigFilePath = `${serviceRoot}/tsconfig.json`;
const jestConfigFilePath = `${serviceRoot}/jest.config.js`;
const eslintConfigFilePath = `${serviceRoot}/.eslintrc.json`;

const filesCreatedArray = [
  indexFilePath,
  testFilePath,
  srcFilePath,
  packageFilePath,
  readmeFilePath,
  npmrcFilePath,
  tsConfigFilePath,
  jestConfigFilePath,
  eslintConfigFilePath,
];

let filesArray = [...filesCreatedArray];

const createAsset = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    // eslint-disable-next-line no-undef
    filesArray = filesArray.filter((file) => file !== filePath);
  } else {
    fs.writeFile(filePath, content, function (err) {
      if (err) {
        // eslint-disable-next-line no-undef
        return console.log('\x1b[31m', `${err}`, '\x1b[0m');
      }
    });
  }
};

const createLogOutput = () => {
  // eslint-disable-next-line no-undef
  if (!filesArray.length) {
    console.log(
      '\x1b[36m',
      `🐠 All files already created for ${serviceName} 🦀`,
      '\x1b[0m'
    );
  } else {
    filesArray.forEach((filePath) => {
      // eslint-disable-next-line no-undef
      console.log('\x1b[36m', ` 🌊 generated: ${filePath}`);
    });
    console.log('\x1b[32m', `🌴🌴 Done creating ${serviceName} 🌴🌴 `);
  }
};

const rnm = 'remove:nm';
const rd = 'remove:dist';

// create package.json
const packageJsonContent = JSON.stringify({
  name: packageName,
  version: '0.0.0',
  description: serviceName,
  author: 'TS-OS',
  license: 'ISC',
  main: 'dist/lib/index.js',
  types: 'dist/lib/index.d.ts',
  directories: { lib: 'lib', test: '__tests__' },
  files: ['dist'],
  publishConfig: { access: 'public' },
  scripts: {
    build: 'tsc',
    test: 'jest',
    [rnm]: 'rimraf node_modules',
    [rd]: 'rimraf dist',
  },
});
createAsset(packageFilePath, packageJsonContent);

// create readme
const readmeContent = `# ${serviceName}`;
createAsset(readmeFilePath, readmeContent);

// create .nvmrc
const nvmrcContent = '14.19.1';
createAsset(npmrcFilePath, nvmrcContent);

// create tsconfig.json
const tsConfigContent = JSON.stringify({
  extends: '../../tsconfig.json',
  compilerOptions: {
    composite: true,
    declaration: true,
    outDir: 'dist',
    esModuleInterop: true,
  },
  include: ['**/*.ts'],
  exclude: ['jest.config.ts', '**/*.spec.ts', '**/*.test.ts', 'dist/**/*'],
});
createAsset(tsConfigFilePath, tsConfigContent);

// create jest.config.js
const jestConfig = JSON.stringify({
  displayName: serviceName,
  testEnvironment: 'node',
  transform: { '^.+\\.[tj]s$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'js', 'html'],
});
const jestConfigContent = `export default ${jestConfig}`;
createAsset(jestConfigFilePath, jestConfigContent);

// create .eslintrc.js
const eslintConfig = JSON.stringify({
  extends: '../../.eslintrc',
  parserOptions: { project: 'tsconfig.json' },
});
// const eslintConfigContent = `export default ${eslintConfig}`;
createAsset(eslintConfigFilePath, eslintConfig);

// create index.ts
const indexContent = "export * from './src/index';";
createAsset(indexFilePath, indexContent);

// create test/index.test.ts
const testContent = `'use strict'; import serviceOne from '../lib/src/${serviceName}'; import { describe, expect, test } from '@jest/globals'; describe('return string', () => {test('returns Hello from service one', () => { expect(serviceOne()).toBe('Hello from serviceOne'); console.log('test passed for serviceOne calling ServiceTwo');});});`;
createAsset(testFilePath, testContent);

// create lib/src/index.ts
const srcContent = `'use strict'; export default function ${
  serviceName.split('-')[0]
}() { console.log('\x1b[34m%s\x1b[0m', "good from ${serviceName}"); return 'Hello from ${serviceName}';} ${
  serviceName.split('-')[0]
}();`;
createAsset(srcFilePath, srcContent);

createLogOutput();
