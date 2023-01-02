import { PublishDto } from './dto/publish.dto';
import { PubnubMessage } from './models/pubnub.message.model';
import { GenericResponse } from '../../base/generic-response.dto';
import { ConfigService } from '@ts-omni/config-service';
import { Logger } from '@ts-omni/logger-service';
interface PublishResponse {
  timetoken: number;
}
export declare class PubnubService {
  private readonly logger;
  private PubnubConfig;
  private pubnub;
  constructor(configService: ConfigService, logger: Logger);
  publishCart(dto: PublishDto): Promise<PublishResponse>;
  publishV2(message: PubnubMessage): Promise<GenericResponse>;
  publishError(channel: string, message: string): Promise<PublishResponse>;
  private createPubnubMessage;
  private formatPubnubProductData;
  private createPubnubProductMessageData;
}
export {};
