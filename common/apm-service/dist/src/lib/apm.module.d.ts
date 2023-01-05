import { DynamicModule } from '@nestjs/common';
export declare class ApmModule {
  static forRoot(name: string, webserverName: string): DynamicModule;
}
