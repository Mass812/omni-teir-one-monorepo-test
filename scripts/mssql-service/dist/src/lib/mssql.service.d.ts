import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@ts-omni/config-service';
import { Request, TYPES } from 'mssql';
import { IMssqlService } from './interfaces/mssql-service.interface';
import { Logger } from '@ts-omni/logger-service';
import { MssqlPoolStatus } from './interfaces/mssql-pool-status.enum';
export { TYPES, Request };
export declare class MssqlService
  implements OnModuleInit, OnModuleDestroy, IMssqlService
{
  private readonly logger;
  private config;
  private pool;
  constructor(configService: ConfigService, logger: Logger);
  onModuleInit(): Promise<void>;
  onModuleDestroy(): Promise<void>;
  delay(ms: number): Promise<void>;
  connect(database: string): Promise<void>;
  close(database: string): Promise<void>;
  status(database: string): MssqlPoolStatus;
  getRequest(database: string): Request | null;
}
