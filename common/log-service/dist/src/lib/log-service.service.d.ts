import { Logger } from 'winston';
export declare class LogService {
  logger: Logger;
  queue: any;
  private readonly _deps;
  private readonly _appName;
  private readonly _appVersion;
  private readonly _env;
  private readonly _config;
  constructor(deps: any);
  init(): void;
  log(level: string, message: string, metaIn?: object): void;
  info(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
  verbose(message: string, meta?: object): void;
  warning(message: string, meta?: object): void;
  debug(message: string, meta?: object): void;
}
