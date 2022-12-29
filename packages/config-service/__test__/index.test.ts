'use strict';
import { ConfigService } from '../src/index';
import { describe, expect, test } from '@jest/globals';
import config from 'config';
import { defaultConfig } from './config';

describe('Test ConfigModule', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('returns a mocked value of config.foo', () => {
    jest.doMock('./config', () => ({ NODE_ENV: 'development' }));
    // eslint-disable-next-line @typescript-eslint/no-var-requires

    expect(defaultConfig.NODE_ENV).toBe('development');
  });

  it('Pass in Dev Param should return true: ', () => {
    expect(ConfigService).toBeDefined();
    // mock the config service
    jest.mock('../src/index', () => {
      return {
        ConfigService: jest.fn().mockImplementation(() => {
          return {
            get: (property: string): string => {
              if (!defaultConfig[property]) return null;
              if (property === 'developent') return 'development';
            },
            isDev: (): boolean => {
              if (defaultConfig.NODE_ENV === 'developent') return true;
              return false;
            },
          };
        }),
      };
    });
  });
});
