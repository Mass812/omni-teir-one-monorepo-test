'use strict';
import { hulk } from '../src/lib/index';
import { describe, expect, test } from '@jest/globals';
describe('return string', () => {
  test('string returned', () => {
    expect(hulk).toBeDefined();
    console.log(`test passed for hulk-venom`);
  });
});
