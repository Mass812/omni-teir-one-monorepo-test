import {
  Injectable,
  Inject,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { ConfigService } from '@ts-omni/config-service';
import { ConnectionPool, Request, TYPES } from 'mssql';
import { IMssqlService } from './interfaces/mssql-service.interface';
import { Logger } from '@ts-omni/logger-service';
import { MssqlPoolStatus } from './interfaces/mssql-pool-status.enum';

export { TYPES, Request };

@Injectable()
export class MssqlService
  implements OnModuleInit, OnModuleDestroy, IMssqlService
{
  private config: Record<string, string> = {};
  private pool: Record<string, ConnectionPool> = {};

  constructor(
    @Inject(ConfigService) configService: ConfigService,
    @Inject(Logger) private readonly logger: Logger
  ) {
    this.config = configService.get('mssql');
  }

  async onModuleInit(): Promise<void> {
    for (const database in this.config) {
      await this.connect(database);
    }
  }

  async onModuleDestroy(): Promise<void> {
    for (const database in this.config) {
      await this.close(database);
    }
  }

  public async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async connect(database: string): Promise<void> {
    try {
      if (!this.pool.hasOwnProperty(database)) {
        this.pool[database] = new ConnectionPool(this.config[database]);

        this.pool[database].on('error', (err: Error) => {
          this.logger.error(`Mssql [${database}] errored ${err}`);
        });
      }

      if (!this.pool[database].connected && !this.pool[database].connecting) {
        await this.pool[database].connect();
        this.logger.info(`Mssql [${database}] connected`);
      } else if (this.pool[database].connecting) {
        while (this.pool[database].connecting) {
          // give some time to connect
          await this.delay(500);
        }
      }
    } catch (err) {
      this.logger.error(`Mssql [${database}] ${err}`);
    }

    return;
  }

  async close(database: string): Promise<void> {
    try {
      if (this.pool.hasOwnProperty(database)) {
        await this.pool[database].close();
        delete this.pool[database];
        this.logger.info(`Mssql [${database}] closed`);
      }
    } catch (err) {
      this.logger.error(`Mssql [${database}] ${err}`);
    }

    return;
  }

  status(database: string): MssqlPoolStatus {
    if (!this.pool.hasOwnProperty(database) || !this.pool[database])
      return MssqlPoolStatus.Closed;

    if (this.pool[database].connected) {
      return MssqlPoolStatus.Connected;
    } else if (this.pool[database].connecting) {
      return MssqlPoolStatus.Connecting;
    } else {
      return MssqlPoolStatus.Closed;
    }
  }

  getRequest(database: string): Request | null {
    try {
      return new Request(this.pool[database]);
    } catch (err) {
      this.logger.error(`Mssql [${database}] ${err}`);
      return null;
    }
  }
}
