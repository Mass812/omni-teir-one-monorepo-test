'use strict';

const serviceTwo = require('..');
const assert = require('assert').strict;

assert.strictEqual(serviceTwo(), 'Hello from serviceTwo');
console.info("serviceTwo tests passed");
