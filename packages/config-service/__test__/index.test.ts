'use strict';
import { ConfigService } from '../src/index';
import { describe, expect, test } from '@jest/globals';
describe('return string', () => {
  test('string returned', () => {
    expect(ConfigService).toBeDefined();
    console.log(`test passed for config-service`);
  });
});
