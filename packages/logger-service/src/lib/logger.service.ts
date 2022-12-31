import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@ts-omni/config-service/src/lib/config.service';
import * as os from 'os';
import * as winston from 'winston';
import WinstonGraylog2 = require('winston-graylog2');

type Meta = Record<string, string | number | any>;

@Injectable()
export class Logger implements OnModuleDestroy {
  private readonly config: Record<string, any>;
  private logger: winston.Logger;
  private ENV = process.env.NODE_ENV;

  constructor(@Inject(ConfigService) configService: ConfigService) {
    this.config = configService.get('logger');
    let transports: Array<any> = [];

    if (this.config.graylogServers.length) {
      transports = [
        new WinstonGraylog2({
          name: `${this.config.graylogFacility} GrayLog Transport`,
          silent: false,
          level: 'debug',
          handleExceptions: false,
          graylog: {
            servers: this.config.graylogServers,
            hostname: os.hostname(),
            facility: this.config.graylogFacility,
            bufferSize: 1400,
          },
          staticMeta: { env: this.ENV },
        }),
      ];
    }

    // create logger with graylog transport
    this.logger = winston.createLogger({
      transports,
    });

    // file logging, if configured
    if (this.config.filename) {
      this.logger.add(
        new winston.transports.File({
          level: this.config.defaultLevel,
          filename: this.config.filename,
          maxsize: 5000000,
          maxFiles: 10,
          format: winston.format.json(),
          tailable: true,
          handleExceptions: true,
        })
      );
    }

    // use console for development
    if (
      [
        'development',
        'test',
        'test-unit',
        'test-integration',
        'test-e2e',
        'preview',
      ].includes(process.env.NODE_ENV)
    ) {
      this.logger.add(
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.colorize({ all: true }),
            winston.format.align(),
            winston.format.simple(),
            winston.format.printf((info) => {
              const { timestamp, level, message, ...args } = info;

              return `${timestamp} ${level}: ${message} ${
                Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
              }`;
            })
          ),
          handleExceptions: false,
        })
      );
    }
  }

  onModuleDestroy() {
    this.logger.close();
  }

  _log(level: string, message: string, metaIn: Meta = {}) {
    const meta: Meta = this.clearSensitiveData(
      JSON.parse(JSON.stringify(metaIn))
    );

    if (
      [
        'development',
        'test',
        'test-integration',
        'test-e2e',
        'test-unit',
        'preview',
      ].includes(process.env.NODE_ENV)
    ) {
      meta.hostname = os.hostname();
      meta.timestamp = new Date().getTime() / 1000;
      meta.app_name = process.env.TFG_APP_NAME;
      meta.app_env = this.ENV;
      meta.app_version = process.env.TFG_APP_VERSION;
    }

    this.logger.log(level, message, meta);
  }

  info(message: string, meta?: Meta) {
    this._log('info', message, meta);
  }

  warn(message: string, meta?: Meta) {
    this._log('warn', message, meta);
  }

  error(message: string, meta?: Meta) {
    this._log('error', message, meta);
  }

  debug(message: string, meta?: Meta) {
    this._log('debug', message, meta);
  }

  // mask sensitive fields from logging
  private clearSensitiveData(data: any) {
    const type = Array.isArray(data) ? 'array' : typeof data;

    switch (type) {
      case 'object':
        if (data) {
          [
            'authorization',
            'password',
            'token',
            'x-auth-api-key',
            'x-auth-token',
          ].forEach((field: string) => {
            if (data.hasOwnProperty(field)) {
              data[field] = '*****';
            }
          });
        }

        for (const field in data) {
          if (data.hasOwnProperty(field)) {
            this.clearSensitiveData(data[field]);
          }
        }
        break;
      case 'array':
        data.forEach((datum: unknown, i: number) => {
          data[i] = this.clearSensitiveData(datum);
        });
        break;
      default:
        break;
    }
    return data;
  }
}
