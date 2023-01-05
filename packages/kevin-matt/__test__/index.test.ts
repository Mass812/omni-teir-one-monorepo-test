'use strict';
import { kevin } from '../src/lib/index';
import { describe, expect, test } from '@jest/globals';
describe('return string', () => {
  test('string returned', () => {
    expect(kevin).toBeDefined();
    console.log(`test passed for kevin-matt`);
  });
});
