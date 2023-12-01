import { ApiProperty } from '@nestjs/swagger';

export default class StudentGroupInvoiceDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 10000 })
  price: number;

  @ApiProperty()
  created_at?: Date;
}
