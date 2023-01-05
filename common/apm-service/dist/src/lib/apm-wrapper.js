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
exports.ApmWrapper = void 0;
const common_1 = require('@nestjs/common');
let ApmWrapper = class ApmWrapper {
  constructor(apm) {
    this.apm = apm;
  }
  setTransactionName(name) {
    if (this.apmAndMethodExist('setTransactionName')) {
      this.apm.setTransactionName(name);
    }
  }
  endTransaction() {
    if (this.apmAndMethodExist('endTransaction')) {
      this.apm.endTransaction();
    }
  }
  trackError(e) {
    if (this.apmAndMethodExist('trackError')) {
      this.apm.trackError(e);
    }
  }
  apmExists() {
    return !!this.apm;
  }
  apmAndMethodExist(methodName) {
    if (!this.apmExists()) {
      return false;
    }
    return typeof this.apm[methodName] === 'function';
  }
};
ApmWrapper = __decorate(
  [(0, common_1.Injectable)(), __metadata('design:paramtypes', [Object])],
  ApmWrapper
);
exports.ApmWrapper = ApmWrapper;
//# sourceMappingURL=apm-wrapper.js.map
