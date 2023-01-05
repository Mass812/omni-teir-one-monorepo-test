'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
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
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.Logger = void 0;
const common_1 = require('@nestjs/common');
const config_service_1 = require('@ts-omni/config-service');
const os = __importStar(require('os'));
const winston = __importStar(require('winston'));
const winston_greylog_two_1 = require('@ts-omni/winston-greylog-two');
let Logger = class Logger {
  constructor(configService) {
    this.ENV = process.env.NODE_ENV;
    this.config = configService.get('logger');
    let transports = [];
    if (this.config.graylogServers.length) {
      transports = [
        new winston_greylog_two_1.Graylog2({
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
    this.logger = winston.createLogger({
      transports,
    });
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
      meta.hostname = os.hostname();
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
