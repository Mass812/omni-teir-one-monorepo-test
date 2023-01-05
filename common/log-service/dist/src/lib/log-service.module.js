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
Object.defineProperty(exports, '__esModule', { value: true });
exports.ScribeModule = void 0;
const common_1 = require('@nestjs/common');
const log_service_service_1 = require('./log-service.service');
let ScribeModule = class ScribeModule {};
ScribeModule = __decorate(
  [
    (0, common_1.Module)({
      providers: [
        log_service_service_1.LogService,
        {
          provide: 'deps',
          useValue: {
            get: (key) => {
              switch (key) {
                case 'appName':
                  return 'MyApp';
                case 'version':
                  return '1.0.0';
                case 'env':
                  return 'development';
                case 'config':
                  return {
                    get: (key) => {
                      switch (key) {
                        case 'log':
                          return {
                            level: 'debug',
                            logConcurrency: 10,
                          };
                      }
                    },
                  };
              }
            },
          },
        },
      ],
      exports: [log_service_service_1.LogService],
    }),
  ],
  ScribeModule
);
exports.ScribeModule = ScribeModule;
//# sourceMappingURL=log-service.module.js.map
