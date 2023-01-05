// create nestjs test
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '../src/index';
import { defaultConfig } from './config';

describe('ConfigService Behavior', () => {
  let configService: ConfigService;
  const NODE_ENV = defaultConfig.NODE_ENV;
  const undefined_environment = '';

  const mockConfigService = {
    get: jest.fn((env) => {
      if (!env) return null;
      if ('development' === env) return env;
    }),
    getEnv: jest.fn(() => {
      return NODE_ENV.toLocaleLowerCase();
    }),
    isDev: jest.fn(() => {
      if (NODE_ENV === 'development') return true;
      return false;
    }),
    isProd: jest.fn(() => {
      if (NODE_ENV === 'production') return true;
      return false;
    }),
  };
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  it('should be based on env value', () => {
    expect(configService.get(NODE_ENV)).toEqual('development');
  });
  it('service should return null if no env value', () => {
    expect(configService.get(undefined_environment)).toEqual(null);
  });
  it('should return isDev value true', () => {
    expect(configService.isDev()).toEqual(true);
  });
  it('should return isProd value false', () => {
    expect(configService.isProd()).toEqual(false);
  });
});
