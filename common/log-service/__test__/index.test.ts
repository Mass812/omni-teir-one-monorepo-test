import { LogService } from '../src/lib/log-service.service';

describe('LogService', () => {
  let logService: LogService;

  beforeEach(() => {
    logService = new LogService({
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case 'appName':
            return 'Test App';
          case 'version':
            return '1.0.0';
          case 'env':
            return 'test';
          case 'config':
            return {
              get: jest.fn().mockReturnValue({
                level: 'debug',
                logConcurrency: 1,
              }),
            };
        }
      }),
    });
  });

  describe('init', () => {
    it('should create a logger with the correct configuration', () => {
      logService.init();
      expect(logService.logger).toBeDefined();
    });
  });

  describe('log', () => {
    it('should add log messages to the queue', () => {
      logService.init();
      logService.log('info', 'Test log message');
      expect(logService.queue.length()).toEqual(1);
    });
  });

  describe('info', () => {
    it('should add an info log message to the queue', () => {
      logService.init();
      logService.info('Test info message');
      expect(logService.queue.length()).toEqual(1);
    });
  });

  describe('warn', () => {
    it('should add a warn log message to the queue', () => {
      logService.init();
      logService.warn('Test warning message', { test: 'test' });
      expect(logService.queue.length()).toEqual(1);
    });
  });

  describe('error', () => {
    it('should add an error log message to the queue', () => {
      logService.init();
      logService.error('Test error message');
      expect(logService.queue.length()).toEqual(1);
    });
  });

  describe('queue should have 7 length', () => {
    it('should add an error log message to the queue', () => {
      logService.init();
      logService.error('Test error message');
      logService.log('info', 'Test error message');
      logService.warn('Test error message');
      logService.verbose('Test error message', { metaData: 'test' });
      logService.error('Test error message');
      logService.log('error', 'Test error message');
      logService.error('Test error message');

      expect(logService.queue.length()).toEqual(7);
    });
  });
});
