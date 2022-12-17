'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const service_two_1 = require("@ts-omni/service-two");
function serviceOne() {
    console.log('\x1b[35m%s\x1b[0m', (0, service_two_1.greetUser)('John'));
    console.log('\x1b[34m%s\x1b[0m', (0, service_two_1.serviceTwo)());
    return 'Hello from serviceOne';
}
exports.default = serviceOne;
serviceOne();
//# sourceMappingURL=service-one.js.map