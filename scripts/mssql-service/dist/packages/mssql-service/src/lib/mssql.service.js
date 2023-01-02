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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MssqlService = exports.Request = exports.TYPES = void 0;
const common_1 = require('@nestjs/common');
const config_service_1 = require('@ts-omni/config-service');
const mssql_1 = require('mssql');
Object.defineProperty(exports, 'Request', {
  enumerable: true,
  get: function () {
    return mssql_1.Request;
  },
});
Object.defineProperty(exports, 'TYPES', {
  enumerable: true,
  get: function () {
    return mssql_1.TYPES;
  },
});
const logger_service_1 = require('@ts-omni/logger-service');
const mssql_pool_status_enum_1 = require('./interfaces/mssql-pool-status.enum');
let MssqlService = class MssqlService {
  constructor(configService, logger) {
    this.logger = logger;
    this.config = {};
    this.pool = {};
    this.config = configService.get('mssql');
  }
  onModuleInit() {
    return __awaiter(this, void 0, void 0, function* () {
      for (const database in this.config) {
        yield this.connect(database);
      }
    });
  }
  onModuleDestroy() {
    return __awaiter(this, void 0, void 0, function* () {
      for (const database in this.config) {
        yield this.close(database);
      }
    });
  }
  delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve) => setTimeout(resolve, ms));
    });
  }
  connect(database) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (!this.pool.hasOwnProperty(database)) {
          this.pool[database] = new mssql_1.ConnectionPool(
            this.config[database]
          );
          this.pool[database].on('error', (err) => {
            this.logger.error(`Mssql [${database}] errored ${err}`);
          });
        }
        if (!this.pool[database].connected && !this.pool[database].connecting) {
          yield this.pool[database].connect();
          this.logger.info(`Mssql [${database}] connected`);
        } else if (this.pool[database].connecting) {
          while (this.pool[database].connecting) {
            yield this.delay(500);
          }
        }
      } catch (err) {
        this.logger.error(`Mssql [${database}] ${err}`);
      }
      return;
    });
  }
  close(database) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (this.pool.hasOwnProperty(database)) {
          yield this.pool[database].close();
          delete this.pool[database];
          this.logger.info(`Mssql [${database}] closed`);
        }
      } catch (err) {
        this.logger.error(`Mssql [${database}] ${err}`);
      }
      return;
    });
  }
  status(database) {
    if (!this.pool.hasOwnProperty(database) || !this.pool[database])
      return mssql_pool_status_enum_1.MssqlPoolStatus.Closed;
    if (this.pool[database].connected) {
      return mssql_pool_status_enum_1.MssqlPoolStatus.Connected;
    } else if (this.pool[database].connecting) {
      return mssql_pool_status_enum_1.MssqlPoolStatus.Connecting;
    } else {
      return mssql_pool_status_enum_1.MssqlPoolStatus.Closed;
    }
  }
  getRequest(database) {
    try {
      return new mssql_1.Request(this.pool[database]);
    } catch (err) {
      this.logger.error(`Mssql [${database}] ${err}`);
      return null;
    }
  }
};
MssqlService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_service_1.ConfigService)),
    __param(1, (0, common_1.Inject)(logger_service_1.Logger)),
    __metadata('design:paramtypes', [
      config_service_1.ConfigService,
      logger_service_1.Logger,
    ]),
  ],
  MssqlService
);
exports.MssqlService = MssqlService;
//# sourceMappingURL=mssql.service.js.map
