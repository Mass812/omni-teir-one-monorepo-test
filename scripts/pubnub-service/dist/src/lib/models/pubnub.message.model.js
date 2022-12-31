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
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.PubnubMessage = void 0;
const swagger_1 = require('@nestjs/swagger');
const base_dto_1 = require('src/base/base.dto');
const _types_1 = require('../../../@types');
const associate_help_model_1 = require('./associate.help.model');
const message_source_model_1 = require('./message.source.model');
const notification_model_1 = require('./notification.model');
const product_request_data_model_1 = require('./product.request.data.model');
let PubnubMessage = class PubnubMessage extends base_dto_1.BaseDto {};
__decorate(
  [(0, swagger_1.ApiProperty)(), __metadata('design:type', String)],
  PubnubMessage.prototype,
  'id',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      enum: _types_1.MessageType,
      enumName: 'MessageType',
    }),
    __metadata(
      'design:type',
      typeof (_a =
        typeof _types_1.MessageType !== 'undefined' && _types_1.MessageType) ===
        'function'
        ? _a
        : Object
    ),
  ],
  PubnubMessage.prototype,
  'type',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({ type: message_source_model_1.MessageSource }),
    __metadata('design:type', message_source_model_1.MessageSource),
  ],
  PubnubMessage.prototype,
  'source',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      oneOf: [
        {
          $ref: (0, swagger_1.getSchemaPath)(
            product_request_data_model_1.ProductRequestData
          ),
        },
        {
          $ref: (0, swagger_1.getSchemaPath)(
            associate_help_model_1.AssociateHelp
          ),
        },
      ],
    }),
    __metadata('design:type', Object),
  ],
  PubnubMessage.prototype,
  'data',
  void 0
);
__decorate(
  [
    (0, swagger_1.ApiProperty)({
      type: notification_model_1.Notification,
      nullable: true,
    }),
    __metadata('design:type', notification_model_1.Notification),
  ],
  PubnubMessage.prototype,
  'notification',
  void 0
);
PubnubMessage = __decorate(
  [
    (0, swagger_1.ApiExtraModels)(
      product_request_data_model_1.ProductRequestData,
      associate_help_model_1.AssociateHelp
    ),
  ],
  PubnubMessage
);
exports.PubnubMessage = PubnubMessage;
//# sourceMappingURL=pubnub.message.model.js.map
