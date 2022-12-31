import { Controller, Body, Post, HttpStatus, Request } from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { OmniTierRequest } from 'src/@types';
import { GenericResponse } from 'src/base/generic-response.dto';
import { PubnubMessage } from './models/pubnub.message.model';
import { PubnubService } from './pubnub.service';

@Controller('pubnub')
@ApiSecurity('x-omni-store-id')
@ApiSecurity('x-omni-store-group-id')
@ApiSecurity('x-omni-warehouse-id')
@ApiSecurity('x-omni-customer-id')
@ApiSecurity('Authorization')
@ApiHeader({ name: 'x-omni-store-id', required: true })
@ApiHeader({ name: 'x-omni-store-group-id', required: true })
@ApiHeader({ name: 'x-omni-session-id' })
@ApiHeader({ name: 'x-omni-warehouse-id' })
@ApiHeader({ name: 'x-omni-administrator-id' })
@ApiHeader({ name: 'x-omni-api-key', required: true })
@ApiHeader({ name: 'x-omni-customer-id', required: true })
@ApiTags('pubnub')
export class PubnubController {
  constructor(private readonly pubnubService: PubnubService) {}

  @Post('/publishMessage')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message published',
    type: GenericResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Service was unable to create a new cart',
  })
  @ApiOperation({ summary: 'Publishes messages to pubnub' })
  async publishMessage(
    @Body() message: PubnubMessage,
    @Request() req: OmniTierRequest
  ): Promise<GenericResponse> {
    return this.pubnubService.publishV2({
      ...message,
      storeId: +req.headers['x-omni-store-id'],
      storeGroupId: +req.headers['x-omni-store-group-id'],
      warehouseId: +req.headers['x-omni-warehouse-id'],
    });
  }
}
