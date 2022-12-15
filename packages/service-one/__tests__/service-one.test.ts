'use strict';

import serviceOne from '../lib/src/service-one';
// const assert = require('assert').strict;

// assert.strictEqual(serviceOne(), 'Hello from serviceOne');
// console.info("serviceOne tests passed");


import {describe, expect, test} from '@jest/globals';


describe('return string', () => {
  test('returns Hello from service one', () => {
    expect(serviceOne()).toBe('Hello from serviceOne');
    console.log("test passed for serviceOne calling ServiceTwo")
  });
});