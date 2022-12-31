'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
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
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, '__esModule', { value: true });
exports.PubnubService = void 0;
const PubNub = __importStar(require('pubnub'));
const common_1 = require('@nestjs/common');
const _types_1 = require('../../@types');
const config_service_1 = require('@ts-omni/config-service');
const logger_service_1 = require('@ts-omni/logger-service');
let PubnubService = class PubnubService {
  constructor(configService, logger) {
    this.logger = logger;
    this.PubnubConfig = configService.get('pubnub');
    this.pubnub = new PubNub({
      uuid: 'pub_nub_client',
      publishKey: this.PubnubConfig.publishKey,
      subscribeKey: this.PubnubConfig.subscribeKey,
    });
  }
  publishCart(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this.logger.info(
          `[Pubnub Service] publish params: ${JSON.stringify(dto)}`
        );
        if (!dto.channel)
          throw new common_1.HttpException('Channel is missing', 400);
        if (!dto.payload || !Object.keys(dto.payload).length)
          throw new common_1.HttpException('Message is missing', 400);
        const pubnubMessage = this.createPubnubMessage(dto);
        const pubnubResponse = yield this.pubnub.publish({
          channel: dto.channel,
          message: pubnubMessage,
        });
        return pubnubResponse;
      } catch (err) {
        this.logger.info(`[Pubnub Service] publish error: ${err.message}`);
        throw new common_1.HttpException(
          err === null || err === void 0 ? void 0 : err.message,
          common_1.HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    });
  }
  publishV2(message) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        this.logger.info(
          `[Pubnub Service] publishV2 params: ${JSON.stringify(message)}`
        );
        const channelKey = `${message.storeId}-${message.warehouseId}`;
        yield this.pubnub.publish({ message, channel: channelKey });
        return { success: true, error: '', message: 'Message Sent' };
      } catch (err) {
        this.logger.info(`[Pubnub Service] publishV2 error: ${err.message}`);
        throw new common_1.HttpException(
          err === null || err === void 0 ? void 0 : err.message,
          common_1.HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    });
  }
  publishError(channel, message) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!channel) throw new common_1.HttpException('Channel is missing', 400);
      if (!message) throw new common_1.HttpException('Message is missing', 400);
      return yield this.pubnub.publish({
        channel,
        message,
      });
    });
  }
  createPubnubMessage(dto) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    this.logger.info(
      `[Pubnub Service] createPubnubMessage params: ${JSON.stringify(dto)}`
    );
    const cart = dto.payload.data;
    const customer =
      (_a = cart.customMetaData) === null || _a === void 0
        ? void 0
        : _a.customer;
    const administrator =
      (_b = cart.customMetaData) === null || _b === void 0
        ? void 0
        : _b.administrator;
    const dressingRoomId =
      (_c = cart.customMetaData) === null || _c === void 0
        ? void 0
        : _c.dressingRoomId;
    const messageData = {
      cartId: cart.cartId,
      customer: Object.assign(Object.assign({}, customer), {
        membershipId: cart.membershipId,
        membershipStatus: cart.membershipStatus,
        isGuest:
          ((_d =
            customer === null || customer === void 0
              ? void 0
              : customer.firstName) === null || _d === void 0
            ? void 0
            : _d.toLowerCase()) === 'guest',
      }),
      echoCart: true,
      itemCount: cart.itemCount,
      products: this.createPubnubProductMessageData(cart.cartLines),
      sessionId: +cart.sessionId,
      cartSourceTypeId: cart.cartSourceTypeId,
    };
    const message = {
      warehouseId: dto.payload.warehouseId,
      type: dto.payload.type,
    };
    if (
      (_e = cart.customMetaData) === null || _e === void 0
        ? void 0
        : _e.dressingRoomLabel
    ) {
      const [, roomNumber] =
        (_g =
          (_f = cart.customMetaData) === null || _f === void 0
            ? void 0
            : _f.dressingRoomLabel) === null || _g === void 0
          ? void 0
          : _g.split(' ');
      message.room = +roomNumber;
    }
    if (
      (_h = cart.customMetaData) === null || _h === void 0
        ? void 0
        : _h.administrator
    ) {
      messageData.administrator = {
        firstName: administrator.administratorFirstName,
        lastName: administrator.administratorLastName,
        administratorId: administrator.administratorId,
      };
    }
    if (dressingRoomId) {
      messageData.dressingRoom = {
        dressingRoomId: dressingRoomId,
      };
    }
    if (dto.payload.type !== _types_1.PUBNUB_TYPES.EXIT_FROM_DRESSING_ROOM)
      message.data = messageData;
    this.logger.info(
      `[Pubnub Service] createPubnubMessage  message: ${JSON.stringify(
        message
      )}`
    );
    return message;
  }
  formatPubnubProductData(cartline) {
    return {
      cartlineId: cartline.cartLineId,
      label: cartline.label,
      color: cartline.color,
      size: cartline.size,
      imageUrl: cartline.thumbnailImageSrc,
      vipPrice: cartline.vipUnitPrice,
      regPrice: cartline.retailUnitPrice,
      productId: cartline.productId,
      masterProductId: cartline.masterProductId,
      itemNumber: cartline.itemNumber,
      permalink: cartline.permalink,
      tokenRedemptionQty: cartline.tokenRedemptionQty,
    };
  }
  createPubnubProductMessageData(cartlines) {
    return cartlines.reduce((acc, curr) => {
      var _a;
      if (
        (_a = curr === null || curr === void 0 ? void 0 : curr.bundleItems) ===
          null || _a === void 0
          ? void 0
          : _a.length
      ) {
        const items = curr.bundleItems.map(this.formatPubnubProductData);
        acc = [...acc, ...items];
      } else {
        acc.push(this.formatPubnubProductData(curr));
      }
      return acc;
    }, []);
  }
};
PubnubService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_service_1.ConfigService)),
    __metadata('design:paramtypes', [
      config_service_1.ConfigService,
      logger_service_1.Logger,
    ]),
  ],
  PubnubService
);
exports.PubnubService = PubnubService;
//# sourceMappingURL=pubnub.service.js.map
