#!node
/* eslint-disable no-undef */
import process from 'node:process';
import fs from 'node:fs';
import pjson from '../../package.json' assert { type: 'json' };
// get project root
const rooted = process.cwd();
// to run this in ROOT run the command node generate some-service
// get service name
const serviceName = process.argv[2] ?? process.env.SERVICE_NAME;

const serviceShortened = serviceName.split('-')[0];
const packageName = `@ts-omni/${serviceName}`;
process.emit();
// directories
const root = './scaffolds';
const serviceRoot = `${rooted}/${root}/${process.argv[2]}`;
const testDir = `${serviceRoot}/__test__`;
const sourceDir = `${serviceRoot}/src`;
const libDir = `${sourceDir}/lib`;

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
if (!fs.existsSync(sourceDir)) {
  fs.mkdirSync(sourceDir);
}
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir);
}
// create files
const indexFilePath = `${sourceDir}/index.ts`;
const testFilePath = `${testDir}/index.test.ts`;
const srcFilePath = `${libDir}/index.ts`;
const packageFilePath = `${serviceRoot}/package.json`;
const readmeFilePath = `${serviceRoot}/README.md`;
const npmrcFilePath = `${serviceRoot}/.nvmrc`;
const tsConfigFilePath = `${serviceRoot}/tsconfig.json`;
const jestConfigFilePath = `${serviceRoot}/jest.config.json`;
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
filesCreatedArray.map((n) => console.log('\x1b[31m', n, '\x1b[0m'));
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
// create readme
const readmeContent = `# ${serviceName}`;
createAsset(readmeFilePath, readmeContent);
// create .nvmrc
const nvmrcContent = '16.15.1';
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
  displayName: `${serviceName}`,
  testEnvironment: 'node',
  transform: { '^.+\\.[tj]s$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'js', 'html'],
});
createAsset(jestConfigFilePath, jestConfig);

// create .eslintrc.js
const eslintConfig = JSON.stringify({
  extends: '../../.eslintrc',
  parserOptions: { project: 'tsconfig.json' },
});

// const eslintConfigContent = `export default ${eslintConfig}`;
createAsset(eslintConfigFilePath, eslintConfig);

// create index.ts
const indexContent = "export * from './lib/index';";
createAsset(indexFilePath, indexContent);
// create test/index.test.ts
const testContent = `'use strict'; import { ${serviceShortened} } from '../src/lib/index'; import { describe, expect, test } from '@jest/globals'; describe('return string', () => {test("string returned", () => { expect(${serviceShortened}).toBeDefined(); console.log(\`test passed for ${serviceName}\`);});});`;
createAsset(testFilePath, testContent);
// create lib/src/index.ts
const srcContent = `'use strict'; export function ${serviceShortened}() { console.log('\x1b[34m%s\x1b[0m', "good from ${serviceName}"); return 'Hello from ${serviceName}';} ${serviceShortened}();`;
createAsset(srcFilePath, srcContent);

const rnm = 'remove:nm';
const rd = 'remove:dist';
// create package.json
const packageJson = {
  name: packageName,
  version: '0.0.0',
  description: serviceName,
  author: 'TS-OS',
  license: 'ISC',
  main: 'dist/src/index.js',
  types: 'dist/src/index.d.ts',
  directories: { src: 'src', test: '__tests__' },
  files: ['dist'],
  publishConfig: { access: 'public' },
  scripts: {
    build: 'tsc',
    test: 'jest',
    [rnm]: 'rimraf node_modules',
    [rd]: 'rimraf dist',
  },
};
let packageJsonContent = { ...packageJson };

// test dependencies
const jestPackageGlobals = '@jest/globals';
const jestTypes = '@types/jest';
const jestGlobalSemver = pjson.devDependencies['@jest/globals'];
const jestSemver = pjson.devDependencies.jest;
const jestTypesSemver = pjson.devDependencies['@types/jest'];

// nest dependencies
const nestCommon = '@nestjs/common';
const nestJsCommon = pjson.dependencies['@nestjs/common'];
const nestReflexMeta = 'reflect-metadata';
const nestDepReflex = pjson.dependencies['reflect-metadata'];
const nestRxjs = 'rxjs';
const nestRDepxjs = pjson.dependencies['rxjs'];
const nestTsLib = 'tslib';
const nestDepTsLib = pjson.dependencies['tslib'];
const nestjsTesting = '@nestjs/testing';
const nestDepTesting = pjson.dependencies['@nestjs/testing'];

packageJsonContent = {
  ...packageJson,
  dependencies: {
    [nestCommon]: nestJsCommon,
    [nestReflexMeta]: nestDepReflex,
    [nestRxjs]: nestRDepxjs,
    [nestTsLib]: nestDepTsLib,
  },
  devDendancies: {
    [nestjsTesting]: nestDepTesting,
    jest: jestSemver,
    [jestPackageGlobals]: jestGlobalSemver,
    [jestTypes]: jestTypesSemver,
  },
};

createAsset(packageFilePath, JSON.stringify(packageJsonContent));
createLogOutput();
