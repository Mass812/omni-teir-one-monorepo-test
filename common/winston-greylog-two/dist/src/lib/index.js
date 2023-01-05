'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Graylog2 = void 0;
const winston_transport_1 = __importDefault(require('winston-transport'));
const graylog2_1 = require('graylog2');
const getMessageLevel = (function () {
  const levels = {
    emerg: 'emergency',
    alert: 'alert',
    crit: 'critical',
    error: 'error',
    warning: 'warning',
    warn: 'warning',
    notice: 'notice',
    info: 'info',
    debug: 'debug',
  };
  return function (winstonLevel) {
    return levels[winstonLevel] || levels.info;
  };
})();
class Graylog2 extends winston_transport_1.default {
  constructor(options) {
    super(options);
    options = options || {};
    this.graylog = options.graylog;
    if (!this.graylog) {
      this.graylog = {
        servers: [
          {
            host: 'localhost',
            port: 12201,
          },
        ],
      };
    }
    this.name = options.name || 'graylog2';
    this.exceptionsLevel = options.exceptionsLevel || 'not-default';
    this.silent = options.silent || false;
    this.handleExceptions = options.handleExceptions || false;
    this.graylog2Client = new graylog2_1.graylog(this.graylog);
    this.staticMeta = options.staticMeta || {};
    this.graylog2Client.on('error', function (error) {
      console.error('Error while trying to write to graylog2:', error);
    });
  }
  log(info, callback) {
    const { message, level, metadata } = info;
    const meta = Object.assign({}, metadata, this.staticMeta);
    const cleanedMessage = message || '';
    const shortMessage = cleanedMessage.substring(0, 100);
    setImmediate(() => {
      this.graylog2Client[getMessageLevel(level)](
        shortMessage,
        cleanedMessage,
        meta
      );
    });
    callback();
  }
  close() {
    this.graylog2Client.close();
  }
}
exports.Graylog2 = Graylog2;
//# sourceMappingURL=index.js.map
