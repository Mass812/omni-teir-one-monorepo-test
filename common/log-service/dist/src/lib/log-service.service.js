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
exports.LogService = void 0;
const common_1 = require('@nestjs/common');
const async_1 = __importDefault(require('async'));
const os_1 = __importDefault(require('os'));
const winston_1 = __importDefault(require('winston'));
let LogService = class LogService {
  constructor(deps) {
    this._deps = deps;
    this._appName = deps.get('appName');
    this._appVersion = deps.get('version');
    this._env = deps.get('env');
    this._config = deps.get('config').get('log');
  }
  init() {
    this.logger = winston_1.default.createLogger({
      level: 'info',
    });
    this.logger.add(
      new winston_1.default.transports.Stream({
        stream: process.stdout,
        level: this._config.level,
      })
    );
    this.logger.add(
      new winston_1.default.transports.Stream({
        stream: process.stderr,
        level: 'error',
      })
    );
    if (
      ['development', 'mocha', 'qa1', 'qa2'].indexOf(process.env.NODE_ENV) !==
      -1
    ) {
      this.logger.add(
        new winston_1.default.transports.Console({
          level: this._config.level,
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
      this.logger.add(
        new winston_1.default.transports.Stream({
          stream: process.stdout,
          level: this._config.level,
        })
      );
      this.logger.add(
        new winston_1.default.transports.Stream({
          stream: process.stderr,
          level: 'error',
        })
      );
    }
    this.queue = async_1.default.queue(({ level, message, meta }, callback) => {
      this.logger.log(level, message, meta, (err) => {
        if (err) {
          this.log('info', message);
          this.log('error', err);
        }
      });
      callback();
    }, this._config.logConcurrency);
  }
  log(level, message, metaIn) {
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
    const meta = {};
    Object.assign(meta, metaIn);
    if (['development', 'mocha'].indexOf(process.env.NODE_ENV) === -1) {
      meta.hostname = os_1.default.hostname();
      meta.timestamp = new Date().getTime() / 1000;
      meta.app_name = this._appName;
      meta.app_env = this._env;
      meta.app_version = this._appVersion;
    }
    this.queue.push({ level, message, meta });
  }
  info(message, meta) {
    this.log('info', message, meta);
  }
  warn(message, meta) {
    this.log('warn', message, meta);
  }
  error(message, meta) {
    this.log('error', message, meta);
  }
  verbose(message, meta) {
    this.log('verbose', message, meta);
  }
  warning(message, meta) {
    this.log('warning', message, meta);
  }
  debug(message, meta) {
    this.log('debug', message, meta);
  }
};
LogService = __decorate(
  [(0, common_1.Injectable)(), __metadata('design:paramtypes', [Object])],
  LogService
);
exports.LogService = LogService;
//# sourceMappingURL=log-service.service.js.map
