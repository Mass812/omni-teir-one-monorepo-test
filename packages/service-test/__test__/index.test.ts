'use strict';
import { service } from '../src/lib/index';
import { describe, expect, test } from '@jest/globals';
describe('return string', () => {
  test('string returned', () => {
    expect(service()).toBe(`Hello from service-test`);
    console.log(`test passed for service-test`);
  });
});
