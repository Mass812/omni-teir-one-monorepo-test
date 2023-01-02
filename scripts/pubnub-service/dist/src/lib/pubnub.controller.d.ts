import { OmniTierRequest } from 'src/@types';
import { GenericResponse } from 'src/base/generic-response.dto';
import { PubnubMessage } from './models/pubnub.message.model';
import { PubnubService } from './pubnub.service';
export declare class PubnubController {
  private readonly pubnubService;
  constructor(pubnubService: PubnubService);
  publishMessage(
    message: PubnubMessage,
    req: OmniTierRequest
  ): Promise<GenericResponse>;
}
