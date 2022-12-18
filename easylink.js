#!node

import process from 'node:process';

// to run this in ROOT run the command node generate some-service

if (process?.argv.length !== 4) {
  // eslint-disable-next-line no-undef
  console.log(
    '\x1b[31m',
    'please provide the service-name where the package dependency is to be added to and then what the sercice-package to be added is'
  );
  process.exit();
}
const serviceOne = process.argv[2];
const serviceTwo = process.argv[3];
// eslint-disable-next-line no-undef
console.log(
  '\x1b[34m\x1b[47m',
  'copy the command below and run to link the two libraries'
);
// eslint-disable-next-line no-undef
console.log(
  '\x1b[34m\x1b[47m',
  `npx lerna add @ts-omni/${serviceOne} --scope=@ts-omni/${serviceTwo}`
);
