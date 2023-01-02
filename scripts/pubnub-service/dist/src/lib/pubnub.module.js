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
exports.PubnubModule = void 0;
const common_1 = require('@nestjs/common');
const config_service_1 = require('config-service');
const pubnub_service_1 = require('./pubnub.service');
const pubnub_controller_1 = require('./pubnub.controller');
let PubnubModule = class PubnubModule {};
PubnubModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [pubnub_service_1.PubnubService, config_service_1.ConfigService],
      providers: [pubnub_service_1.PubnubService],
      exports: [pubnub_service_1.PubnubService],
      controllers: [pubnub_controller_1.PubnubController],
    }),
  ],
  PubnubModule
);
exports.PubnubModule = PubnubModule;
//# sourceMappingURL=pubnub.module.js.map
