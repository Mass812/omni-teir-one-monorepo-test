'use strict';
import { pubnub } from '../src/lib/index';
import { describe, expect, test } from '@jest/globals';
describe('return string', () => {
  test('string returned', () => {
    expect(pubnub()).toBe(`Hello from pubnub-service`);
    console.log(`test passed for pubnub-service`);
  });
});
