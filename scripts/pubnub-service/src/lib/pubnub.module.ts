import { Module } from '@nestjs/common';
import { ConfigService } from '@ts-omni/config-service';
import { PubnubService } from './pubnub.service';
import { PubnubController } from './pubnub.controller';

@Module({
  imports: [PubnubService, ConfigService],
  providers: [PubnubService],
  exports: [PubnubService],
  controllers: [PubnubController],
})
export class PubnubModule {}
