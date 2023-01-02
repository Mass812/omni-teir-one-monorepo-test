import { PUBNUB_TYPES } from 'src/@types/pubnub';
import { Cart } from 'src/shop/models/cart.model';
export declare class PublishDto {
  channel: string;
  payload: {
    warehouseId: number;
    type: PUBNUB_TYPES;
    data: Cart | string;
  };
}
