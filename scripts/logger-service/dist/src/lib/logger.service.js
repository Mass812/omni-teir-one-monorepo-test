'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Logger = void 0;
const common_1 = require('@nestjs/common');
const config_service_1 = require('@ts-omni/config-service/src/lib/config.service');
const os_1 = __importDefault(require('os'));
const winston_1 = __importDefault(require('winston'));
const WinstonGraylog2 = require('winston-graylog2');
let Logger = class Logger {
  constructor(configService) {
    this.ENV = process.env.NODE_ENV;
    this.config = configService.get('logger');
    let transports = [];
    if (this.config.graylogServers.length) {
      transports = [
        new WinstonGraylog2({
          name: `${this.config.graylogFacility} GrayLog Transport`,
          silent: false,
          level: 'debug',
          handleExceptions: false,
          graylog: {
            servers: this.config.graylogServers,
            hostname: os_1.default.hostname(),
            facility: this.config.graylogFacility,
            bufferSize: 1400,
          },
          staticMeta: { env: this.ENV },
        }),
      ];
    }
    this.logger = winston_1.default.createLogger({
      transports,
    });
    if (this.config.filename) {
      this.logger.add(
        new winston_1.default.transports.File({
          level: this.config.defaultLevel,
          filename: this.config.filename,
          maxsize: 5000000,
          maxFiles: 10,
          format: winston_1.default.format.json(),
          tailable: true,
          handleExceptions: true,
        })
      );
    }
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
        new winston_1.default.transports.Console({
          level: 'debug',
          format: winston_1.default.format.combine(
            winston_1.default.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston_1.default.format.colorize({ all: true }),
            winston_1.default.format.align(),
            winston_1.default.format.simple(),
            winston_1.default.format.printf((info) => {
              const { timestamp, level, message } = info,
                args = __rest(info, ['timestamp', 'level', 'message']);
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
  _log(level, message, metaIn = {}) {
    const meta = this.clearSensitiveData(JSON.parse(JSON.stringify(metaIn)));
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
      meta.hostname = os_1.default.hostname();
      meta.timestamp = new Date().getTime() / 1000;
      meta.app_name = process.env.TFG_APP_NAME;
      meta.app_env = this.ENV;
      meta.app_version = process.env.TFG_APP_VERSION;
    }
    this.logger.log(level, message, meta);
  }
  info(message, meta) {
    this._log('info', message, meta);
  }
  warn(message, meta) {
    this._log('warn', message, meta);
  }
  error(message, meta) {
    this._log('error', message, meta);
  }
  debug(message, meta) {
    this._log('debug', message, meta);
  }
  clearSensitiveData(data) {
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
          ].forEach((field) => {
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
        data.forEach((datum, i) => {
          data[i] = this.clearSensitiveData(datum);
        });
        break;
      default:
        break;
    }
    return data;
  }
};
Logger = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_service_1.ConfigService)),
    __metadata('design:paramtypes', [config_service_1.ConfigService]),
  ],
  Logger
);
exports.Logger = Logger;
//# sourceMappingURL=logger.service.js.map
