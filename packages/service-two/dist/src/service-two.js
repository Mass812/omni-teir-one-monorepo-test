'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.greetUser = exports.serviceTwo = void 0;
const serviceTwo = () => {
    const newLocal = "Hello from serviceTwo file";
    return newLocal;
};
exports.serviceTwo = serviceTwo;
const greetUser = (name) => {
    return `Hello ${name} from serviceTwo file`;
};
exports.greetUser = greetUser;
//# sourceMappingURL=service-two.js.map