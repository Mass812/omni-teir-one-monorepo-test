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
var ApmModule_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.ApmModule = void 0;
const apm_constants_1 = require('./apm.constants');
const apm_service_1 = require('./apm.service');
const apm_site247_store_1 = require('./repository/stores/apm-site247.store');
const common_1 = require('@nestjs/common');
let ApmModule = (ApmModule_1 = class ApmModule {
  static forRoot(name, webserverName) {
    return {
      module: ApmModule_1,
      providers: [
        {
          provide: apm_constants_1.APM_CONFIG_NAME,
          useValue: name,
        },
        {
          provide: apm_constants_1.APM_WEBSERVER_CONFIG_NAME,
          useValue: webserverName,
        },
        {
          provide: 'IApmRepository',
          useClass: apm_site247_store_1.ApmSite24x7Store,
        },
        apm_service_1.ApmService,
      ],
    };
  }
});
ApmModule = ApmModule_1 = __decorate([(0, common_1.Module)({})], ApmModule);
exports.ApmModule = ApmModule;
//# sourceMappingURL=apm.module.js.map
