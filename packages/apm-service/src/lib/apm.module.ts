import { APM_CONFIG_NAME, APM_WEBSERVER_CONFIG_NAME } from './apm.constants';
import { HttpApmMiddleware } from '../core/middleware/http-apm.middleware';
import { ApmService } from './apm.service';
import { ApmSite24x7Store } from './repository/stores/apm-site247.store';
import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';

@Module({})
export class ApmModule {
  static forRoot(name: string, webserverName: string): DynamicModule {
    return {
      module: ApmModule,
      providers: [
        {
          provide: APM_CONFIG_NAME,
          useValue: name,
        },
        {
          provide: APM_WEBSERVER_CONFIG_NAME,
          useValue: webserverName,
        },
        {
          provide: 'IApmRepository',
          useClass: ApmSite24x7Store,
        },
        ApmService,
      ],
    };
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpApmMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
