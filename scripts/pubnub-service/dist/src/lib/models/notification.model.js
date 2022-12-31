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
exports.Notification = void 0;
const swagger_1 = require('@nestjs/swagger');
class Notification {}
__decorate(
  [(0, swagger_1.ApiProperty)(), __metadata('design:type', String)],
  Notification.prototype,
  'title',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', String),
  ],
  Notification.prototype,
  'subtitle',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', String),
  ],
  Notification.prototype,
  'confirmLabel',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', String),
  ],
  Notification.prototype,
  'declineLabel',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', String),
  ],
  Notification.prototype,
  'image',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', Boolean),
  ],
  Notification.prototype,
  'beep',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', Boolean),
  ],
  Notification.prototype,
  'vibrate',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', Boolean),
  ],
  Notification.prototype,
  'dismissOnTap',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata('design:type', Object),
  ],
  Notification.prototype,
  'onConfirm',
  void 0
);
exports.Notification = Notification;
//# sourceMappingURL=notification.model.js.map
