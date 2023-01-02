import { ApiProperty } from '@nestjs/swagger';

export class AssociateHelp {
  @ApiProperty()
  reason: string;

  @ApiProperty()
  firstName: string;
}
