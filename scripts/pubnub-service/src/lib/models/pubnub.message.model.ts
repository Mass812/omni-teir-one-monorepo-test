import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BaseDto } from 'src/base/base.dto';
import { MessageType } from '../../../@types';

import { AssociateHelp } from './associate.help.model';
import { MessageSource } from './message.source.model';
import { Notification } from './notification.model';
import { ProductRequestData } from './product.request.data.model';

@ApiExtraModels(ProductRequestData, AssociateHelp)
export class PubnubMessage extends BaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: MessageType, enumName: 'MessageType' })
  type: MessageType;

  @ApiProperty({ type: MessageSource })
  source?: MessageSource;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(ProductRequestData) },
      { $ref: getSchemaPath(AssociateHelp) },
    ],
  })
  data: ProductRequestData | AssociateHelp;

  @ApiProperty({ type: Notification, nullable: true })
  notification?: Notification;
}
