import * as PubNub from 'pubnub';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import {
  PubnubConfig,
  EchoPubnubMessage,
  EchoPubnubPayload,
  PUBNUB_TYPES,
  Administrator,
  PubnubCustomer,
  LineItem,
} from '../../@types';
import { PublishDto } from './dto/publish.dto';
import { PubnubMessage } from './models/pubnub.message.model';
import { GenericResponse } from '../../base/generic-response.dto';
import { CartLine } from '../../cartline/model/cartLine.model';
import { Cart } from '../../shop/models/cart.model';
import { BundleCartItem } from '../../cartline/model/bundle-cart-item.model';
import { ConfigService } from '@ts-omni/config-service';
import { Logger } from '@ts-omni/logger-service';

interface PublishResponse {
  timetoken: number;
}

@Injectable()
export class PubnubService {
  private PubnubConfig: PubnubConfig;
  private pubnub: PubNub;

  constructor(
    @Inject(ConfigService) configService: ConfigService,
    private readonly logger: Logger
  ) {
    this.PubnubConfig = configService.get<PubnubConfig>('pubnub');
    // TODO Fix
    this.pubnub = new PubNub({
      uuid: 'pub_nub_client',
      publishKey: this.PubnubConfig.publishKey,
      subscribeKey: this.PubnubConfig.subscribeKey,
    });
  }

  async publishCart(dto: PublishDto): Promise<PublishResponse> {
    try {
      this.logger.info(
        `[Pubnub Service] publish params: ${JSON.stringify(dto)}`
      );

      if (!dto.channel) throw new HttpException('Channel is missing', 400);
      if (!dto.payload || !Object.keys(dto.payload).length)
        throw new HttpException('Message is missing', 400);

      const pubnubMessage = this.createPubnubMessage(dto);
      const pubnubResponse: PublishResponse = await this.pubnub.publish({
        channel: dto.channel,
        message: pubnubMessage,
      });
      return pubnubResponse;
    } catch (err) {
      this.logger.info(`[Pubnub Service] publish error: ${err.message}`);
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async publishV2(message: PubnubMessage): Promise<GenericResponse> {
    try {
      this.logger.info(
        `[Pubnub Service] publishV2 params: ${JSON.stringify(message)}`
      );

      // construct channel key using the storeId and warehouseId from headers
      const channelKey = `${message.storeId}-${message.warehouseId}`;

      /**
       * future work/optimization
       * do we want to cache the channel key so it can be retrived from another endpoint like a settings api
       * should we cache the previous message to prevent a user from replaying a request
       *
       * should we run all the pubnub publish through a queue?
       */
      await this.pubnub.publish({ message, channel: channelKey });
      return { success: true, error: '', message: 'Message Sent' };
    } catch (err) {
      this.logger.info(`[Pubnub Service] publishV2 error: ${err.message}`);
      throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async publishError(
    channel: string,
    message: string
  ): Promise<PublishResponse> {
    if (!channel) throw new HttpException('Channel is missing', 400);
    if (!message) throw new HttpException('Message is missing', 400);

    return await this.pubnub.publish({
      channel,
      message,
    });
  }

  private createPubnubMessage(dto: PublishDto): EchoPubnubMessage {
    this.logger.info(
      `[Pubnub Service] createPubnubMessage params: ${JSON.stringify(dto)}`
    );

    const cart = dto.payload.data as Cart;
    const customer = cart.customMetaData?.customer as unknown as PubnubCustomer;
    const administrator = cart.customMetaData
      ?.administrator as unknown as Administrator;
    const dressingRoomId = cart.customMetaData?.dressingRoomId;

    const messageData: EchoPubnubPayload = {
      cartId: cart.cartId,
      customer: {
        ...customer,
        membershipId: cart.membershipId,
        membershipStatus: (cart as any).membershipStatus,
        isGuest: customer?.firstName?.toLowerCase() === 'guest',
      },
      echoCart: true,
      itemCount: cart.itemCount,
      products: this.createPubnubProductMessageData(cart.cartLines),
      sessionId: +cart.sessionId,
      cartSourceTypeId: cart.cartSourceTypeId,
    };

    const message: EchoPubnubMessage = {
      warehouseId: dto.payload.warehouseId,
      type: dto.payload.type,
    };

    if (cart.customMetaData?.dressingRoomLabel) {
      const [, roomNumber] = (
        cart.customMetaData?.dressingRoomLabel as string
      )?.split(' ');

      message.room = +roomNumber;
    }

    if (cart.customMetaData?.administrator) {
      messageData.administrator = {
        firstName: administrator.administratorFirstName,
        lastName: administrator.administratorLastName,
        administratorId: administrator.administratorId,
      };
    }

    if (dressingRoomId) {
      messageData.dressingRoom = {
        dressingRoomId: dressingRoomId as number,
      };
    }

    if (dto.payload.type !== PUBNUB_TYPES.EXIT_FROM_DRESSING_ROOM)
      message.data = messageData;

    this.logger.info(
      `[Pubnub Service] createPubnubMessage  message: ${JSON.stringify(
        message
      )}`
    );

    return message;
  }

  private formatPubnubProductData(
    cartline: CartLine | BundleCartItem
  ): LineItem {
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

  private createPubnubProductMessageData(cartlines: Array<CartLine>) {
    return cartlines.reduce((acc: Array<LineItem>, curr: CartLine) => {
      if (curr?.bundleItems?.length) {
        const items = curr.bundleItems.map(this.formatPubnubProductData);
        acc = [...acc, ...items];
      } else {
        acc.push(this.formatPubnubProductData(curr));
      }
      return acc;
    }, []);
  }
}
