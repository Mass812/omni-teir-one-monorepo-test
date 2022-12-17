// 'use strict';

// import {greetUser, serviceTwo} from '../lib/service-two';
// const assert = require('assert').strict;

// assert.strictEqual(serviceTwo(), 'Hello from serviceTwo');
// // assert.strictEqual(greetUser(name), `Hello ${name} from serviceTwo file`);
// console.info("serviceTwo tests passed");

'use strict';

import { serviceTwo } from '../lib/src/service-two';
// const assert = require('assert').strict;

// assert.strictEqual(serviceOne(), 'Hello from serviceOne');
// console.info("serviceOne tests passed");

import { describe, expect, test } from '@jest/globals';

describe('return string', () => {
  test('returns Hello from service two', () => {
    expect(serviceTwo()).toBe('Hello from serviceTwo file');
    console.log('\x1b[34m\x1b[47m', 'serviceTwo tests passed', '\x1b[0m');
  });
});
