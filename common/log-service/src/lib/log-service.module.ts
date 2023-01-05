import { Module } from '@nestjs/common';
import { LogService } from './log-service.service';

@Module({
  providers: [
    LogService,
    {
      provide: 'deps',
      useValue: {
        get: (key: string) => {
          switch (key) {
            case 'appName':
              return 'MyApp';
            case 'version':
              return '1.0.0';
            case 'env':
              return 'development';
            case 'config':
              return {
                get: (key: string) => {
                  switch (key) {
                    case 'log':
                      return {
                        level: 'debug',
                        logConcurrency: 10,
                      };
                  }
                },
              };
          }
        },
      },
    },
  ],
  exports: [LogService],
})
export class ScribeModule {}
