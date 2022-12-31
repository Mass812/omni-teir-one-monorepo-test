/**
 * @group unit/pubnub
 */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from 'config-service';
import { PubnubModule } from '../pubnub.module';
import { PubnubService } from '../pubnub.service';
import { HttpException } from '@nestjs/common';

import { PUBNUB_TYPES } from 'src/@types';
import { mockCart } from 'src/shop/__test__/fixtures/mockCart';
import { LoggerModule, Logger } from 'logger-service';
import { MockLogger } from 'src/test/mocks';

jest.mock('pubnub', () => {
  return jest.fn(() => {
    return {
      publish: jest.fn(() => Promise.resolve({ timetoken: 12334234 })),
    };
  });
});

describe('PubnubService', () => {
  let service: PubnubService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [PubnubModule, ConfigModule, LoggerModule],
      providers: [PubnubService, ConfigService],
    })
      .overrideProvider(Logger)
      .useClass(MockLogger)
      .compile();

    service = module.get<PubnubService>(PubnubService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('publish', () => {
    test('calling publish should return timetoken', async () => {
      const response = await service.publishCart({
        channel: 'test channel',
        payload: {
          warehouseId: 324,
          type: PUBNUB_TYPES.UPDATE_CART,
          data: {
            ...mockCart,
            customMetaData: {
              dressingRoomLabel: 'Room 2',
            },
          },
        },
      });

      expect(response).toEqual({ timetoken: 12334234 });
    });

    test('should throw error if channel is missing', async () => {
      try {
        await service.publishCart({
          channel: null,
          payload: {
            warehouseId: 324,
            type: PUBNUB_TYPES.UPDATE_CART,
            data: mockCart,
          },
        });
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.response).toBe('Channel is missing');
      }
    });

    test('should throw error if message is missing', async () => {
      try {
        await service.publishCart({
          channel: 'test channel',
          payload: null,
        });
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.response).toBe('Message is missing');
      }
    });
  });
});
