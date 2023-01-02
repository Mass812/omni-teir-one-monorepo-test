import { ApiProperty } from '@nestjs/swagger';

export class Notification {
  @ApiProperty()
  title: string;

  @ApiProperty({ nullable: true })
  subtitle?: string;

  @ApiProperty({ nullable: true })
  confirmLabel?: string;

  @ApiProperty({ nullable: true })
  declineLabel?: string;

  @ApiProperty({ nullable: true })
  image?: string;

  @ApiProperty({ nullable: true })
  beep?: boolean;

  @ApiProperty({ nullable: true })
  vibrate?: boolean;

  @ApiProperty({ nullable: true })
  dismissOnTap?: boolean;

  @ApiProperty({ nullable: true })
  // When associate taps confirm button, this payload is published verbatim
  onConfirm?: Record<string, string | number | unknown>;
}
