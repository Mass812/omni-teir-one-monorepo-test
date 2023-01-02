'use strict';
import { MssqlService } from '../src/index';
import { describe, expect, test } from '@jest/globals';
describe('return string', () => {
  test('string returned', () => {
    expect(MssqlService).toBeDefined();
    console.log(`test passed for mssql-service`);
  });
});
