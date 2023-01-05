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
Object.defineProperty(exports, '__esModule', { value: true });
exports.HttpApmMiddleware = void 0;
const common_1 = require('@nestjs/common');
const apm_service_1 = require('../apm.service');
let HttpApmMiddleware = class HttpApmMiddleware {
  constructor(apmService) {
    this.apmService = apmService;
  }
  use(req, res, next) {
    var _a;
    const apmWrapper =
      (_a = res === null || res === void 0 ? void 0 : res.apm) !== null &&
      _a !== void 0
        ? _a
        : this.apmService.getApm();
    apmWrapper.setTransactionName(req.originalUrl);
    res['apm'] = apmWrapper;
    next();
  }
};
HttpApmMiddleware = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [apm_service_1.ApmService]),
  ],
  HttpApmMiddleware
);
exports.HttpApmMiddleware = HttpApmMiddleware;
//# sourceMappingURL=http-apm.middleware.js.map
