import { ApiProperty } from '@nestjs/swagger';

export class OutputTransactionDto {
  @ApiProperty({
    description: 'The external ID of the transaction',
    type: String,
  })
  transactionExternalId: string;

  @ApiProperty({
    description: 'The type of the transaction',
    type: Object,
    properties: {
      name: { type: 'string' },
    },
  })
  transactionType: {
    name: string;
  };

  @ApiProperty({
    description: 'The status of the transaction',
    type: Object,
    properties: {
      name: { type: 'string' },
    },
  })
  transactionStatus: {
    name: string;
  };

  @ApiProperty({
    description: 'The value of the transaction',
    type: Number,
  })
  value: number;

  @ApiProperty({
    description: 'The date when the transaction was created',
    type: Date,
  })
  createdAt: Date;
}
