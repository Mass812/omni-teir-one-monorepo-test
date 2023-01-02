import { ApiProperty } from '@nestjs/swagger';

export class ProductRequestData {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  label: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  avaiableQty: number;

  @ApiProperty()
  customerName: string;

  @ApiProperty({ nullable: true })
  cartId?: string;

  @ApiProperty({ nullable: true })
  session?: string; // Allows us to not look up a cart against active carts, and just insert directly
}
