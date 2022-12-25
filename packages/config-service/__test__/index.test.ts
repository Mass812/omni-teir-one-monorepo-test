'use strict';
import { ConfigService } from '../src/index';
import { describe, expect, test } from '@jest/globals';
import { env } from 'process';
import * as config from 'config';

describe('Test ConfigModule', () => {
  const hold = ConfigService.prototype.isDev;
  console.log('\x1b[36m', env, config, '\x1b[0m');
  test('Pass in Dev Param should return true: ', () => {
    expect(ConfigService).toBeDefined();
    // mock the config service
    jest.mock('../src/index', () => {
      return {
        ConfigService: jest.fn().mockImplementation(() => {
          return {
            get: (property: string): string => {
              return 'development';
            },
            isDev: (): boolean => {
              return true;
            },
          };
        }),
      };
    });
    console.log(`test passed for config-service`);
  });
});
