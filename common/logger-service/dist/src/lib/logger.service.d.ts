import { OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@ts-omni/config-service';
type Meta = Record<string, string | number | any>;
export declare class Logger implements OnModuleDestroy {
  private readonly config;
  private logger;
  private ENV;
  constructor(configService: ConfigService);
  onModuleDestroy(): void;
  _log(level: string, message: string, metaIn?: Meta): void;
  info(message: string, meta?: Meta): void;
  warn(message: string, meta?: Meta): void;
  error(message: string, meta?: Meta): void;
  debug(message: string, meta?: Meta): void;
  private clearSensitiveData;
}
export {};
