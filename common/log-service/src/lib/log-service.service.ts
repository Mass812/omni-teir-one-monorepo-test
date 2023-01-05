import { Injectable } from '@nestjs/common';
import async from 'async';
import os from 'os';
import winston, { Logger } from 'winston';

@Injectable()
export class LogService {
  public logger: Logger;
  public queue: any;
  private readonly _deps: any;
  private readonly _appName: string;
  private readonly _appVersion: string;
  private readonly _env: string;
  private readonly _config: any;

  constructor(deps: any) {
    this._deps = deps;
    this._appName = deps.get('appName');
    this._appVersion = deps.get('version');
    this._env = deps.get('env');
    this._config = deps.get('config').get('log');
  }

  init() {
    this.logger = winston.createLogger({
      level: 'info',
    });

    this.logger.add(
      new winston.transports.Stream({
        stream: process.stdout,
        level: this._config.level,
      })
    );

    this.logger.add(
      new winston.transports.Stream({
        stream: process.stderr,
        level: 'error',
      })
    );

    if (
      ['development', 'mocha', 'qa1', 'qa2'].indexOf(process.env.NODE_ENV) !==
      -1
    ) {
      this.logger.add(
        new winston.transports.Console({
          level: this._config.level,
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
      this.logger.add(
        new winston.transports.Stream({
          stream: process.stdout,
          level: this._config.level,
        })
      );
      this.logger.add(
        new winston.transports.Stream({
          stream: process.stderr,
          level: 'error',
        })
      );
    }

    // setup logging queue
    this.queue = async.queue(({ level, message, meta }, callback) => {
      this.logger.log(level, message, meta, (err) => {
        if (err) {
          this.log('info', message);
          this.log('error', err);
        }
      });
      callback();
    }, this._config.logConcurrency);
  }

  log(level: string, message: string, metaIn?: object) {
    if (level === 'verbose') {
      level = 'debug';
    }

    if (level === 'warning') {
      level = 'warn';
    }

    if (typeof metaIn !== 'object') {
      metaIn = { meta: metaIn };
    }

    metaIn = metaIn || {};
    const meta: any = {};
    Object.assign(meta, metaIn);

    // for console debugging, turn off extra meta fields
    if (['development', 'mocha'].indexOf(process.env.NODE_ENV) === -1) {
      meta.hostname = os.hostname();
      meta.timestamp = new Date().getTime() / 1000;
      meta.app_name = this._appName;
      meta.app_env = this._env;
      meta.app_version = this._appVersion;
    }

    this.queue.push({ level, message, meta });
  }

  info(message: string, meta?: object) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: object) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: object) {
    this.log('error', message, meta);
  }

  verbose(message: string, meta?: object) {
    this.log('verbose', message, meta);
  }

  warning(message: string, meta?: object) {
    this.log('warning', message, meta);
  }

  debug(message: string, meta?: object) {
    this.log('debug', message, meta);
  }
}
