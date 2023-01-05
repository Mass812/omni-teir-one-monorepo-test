'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ApmSite24x7ConfigDto = void 0;
class ApmSite24x7ConfigDto {
  appName() {
    if (this.isValidConfig()) {
      return `${this.name}-${this.environment}`;
    }
    return '';
  }
  canGenerate() {
    if (!this.isEnabled) {
      return false;
    }
    return this.isValidConfig();
  }
  isValidConfig() {
    if (this.licenseKey && this.port && this.environment) {
      return true;
    } else {
      return false;
    }
  }
}
exports.ApmSite24x7ConfigDto = ApmSite24x7ConfigDto;
//# sourceMappingURL=apm-site24x7-config.dto.js.map
