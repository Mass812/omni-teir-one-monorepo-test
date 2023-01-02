import { BaseDto } from 'src/base/base.dto';
import { MessageType } from '../../../@types';
import { AssociateHelp } from './associate.help.model';
import { MessageSource } from './message.source.model';
import { Notification } from './notification.model';
import { ProductRequestData } from './product.request.data.model';
export declare class PubnubMessage extends BaseDto {
  id: string;
  type: MessageType;
  source?: MessageSource;
  data: ProductRequestData | AssociateHelp;
  notification?: Notification;
}
