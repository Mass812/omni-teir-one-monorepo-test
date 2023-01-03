'use strict';
import { Graylog2 } from '../src/lib/index';
import { describe, expect, test } from '@jest/globals';
describe('return string', () => {
  test('string returned', () => {
    expect(Graylog2).toBeDefined();
    console.log(`test passed for ts-winston-greylog2`);
  });
});
