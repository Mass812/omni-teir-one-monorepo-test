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
Object.defineProperty(exports, '__esModule', { value: true });
exports.ConfigService = void 0;
const config = __importStar(require('config'));
const common_1 = require('@nestjs/common');
let ConfigService = class ConfigService {
  get(property) {
    if (!config.has(property)) return null;
    return config.get(property);
  }
  getEnv() {
    return config.util.getEnv('NODE_ENV').toLocaleLowerCase();
  }
  isDb166() {
    return this.get('mssql.ultramerchant.server').slice(0, 5) == 'db166';
  }
  isProd() {
    return this.getEnv() === 'production';
  }
  isQa() {
    return this.getEnv().slice(0, 2) === 'qa';
  }
  isQa1() {
    return this.getEnv() === 'qa1';
  }
  isQa2() {
    return this.getEnv() === 'qa2';
  }
  isQa3() {
    return this.getEnv() === 'qa3';
  }
  isQa4() {
    return this.getEnv() === 'qa4';
  }
  isDev() {
    return this.getEnv() === 'development';
  }
  isPreview() {
    return this.getEnv() === 'preview';
  }
  isStage() {
    return this.getEnv() === 'stg';
  }
};
ConfigService = __decorate([(0, common_1.Injectable)()], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map
