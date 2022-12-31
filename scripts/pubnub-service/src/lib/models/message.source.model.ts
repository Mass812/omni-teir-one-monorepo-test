import { ApiProperty } from '@nestjs/swagger';

export class MessageSource {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  label: string;
}
