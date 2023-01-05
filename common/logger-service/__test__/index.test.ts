'use strict';
import { Logger } from '../src/index';
import { describe, expect, test } from '@jest/globals';
describe('Logger class exists', () => {
  test('string returned', () => {
    expect(Logger).toBeDefined();
    console.log(`test passed for logger-service`);
  });
});
