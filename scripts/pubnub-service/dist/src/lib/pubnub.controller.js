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
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.PubnubController = void 0;
const common_1 = require('@nestjs/common');
const swagger_1 = require('@nestjs/swagger');
const _types_1 = require('src/@types');
const generic_response_dto_1 = require('src/base/generic-response.dto');
const pubnub_message_model_1 = require('./models/pubnub.message.model');
const pubnub_service_1 = require('./pubnub.service');
let PubnubController = class PubnubController {
  constructor(pubnubService) {
    this.pubnubService = pubnubService;
  }
  publishMessage(message, req) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.pubnubService.publishV2(
        Object.assign(Object.assign({}, message), {
          storeId: +req.headers['x-omni-store-id'],
          storeGroupId: +req.headers['x-omni-store-group-id'],
          warehouseId: +req.headers['x-omni-warehouse-id'],
        })
      );
    });
  }
};
__decorate(
  [
    (0, common_1.Post)('/publishMessage'),
    (0, swagger_1.ApiResponse)({
      status: common_1.HttpStatus.OK,
      description: 'Message published',
      type: generic_response_dto_1.GenericResponse,
    }),
    (0, swagger_1.ApiResponse)({
      status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Service was unable to create a new cart',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Publishes messages to pubnub' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      pubnub_message_model_1.PubnubMessage,
      typeof (_a =
        typeof _types_1.OmniTierRequest !== 'undefined' &&
        _types_1.OmniTierRequest) === 'function'
        ? _a
        : Object,
    ]),
    __metadata('design:returntype', Promise),
  ],
  PubnubController.prototype,
  'publishMessage',
  null
);
PubnubController = __decorate(
  [
    (0, common_1.Controller)('pubnub'),
    (0, swagger_1.ApiSecurity)('x-omni-store-id'),
    (0, swagger_1.ApiSecurity)('x-omni-store-group-id'),
    (0, swagger_1.ApiSecurity)('x-omni-warehouse-id'),
    (0, swagger_1.ApiSecurity)('x-omni-customer-id'),
    (0, swagger_1.ApiSecurity)('Authorization'),
    (0, swagger_1.ApiHeader)({ name: 'x-omni-store-id', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'x-omni-store-group-id', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'x-omni-session-id' }),
    (0, swagger_1.ApiHeader)({ name: 'x-omni-warehouse-id' }),
    (0, swagger_1.ApiHeader)({ name: 'x-omni-administrator-id' }),
    (0, swagger_1.ApiHeader)({ name: 'x-omni-api-key', required: true }),
    (0, swagger_1.ApiHeader)({ name: 'x-omni-customer-id', required: true }),
    (0, swagger_1.ApiTags)('pubnub'),
    __metadata('design:paramtypes', [pubnub_service_1.PubnubService]),
  ],
  PubnubController
);
exports.PubnubController = PubnubController;
//# sourceMappingURL=pubnub.controller.js.map
