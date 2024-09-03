import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsInt, IsPositive, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateTransactionDto {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The external ID of the debit account',
    type: String,
    format: 'uuid',
  })
  accountExternalIdDebit: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The external ID of the credit account',
    type: String,
    format: 'uuid',
  })
  accountExternalIdCredit: string;

  @Field()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @IsIn([1, 2], { message: 'tranferTypeId must be either 1 or 2' })
  @ApiProperty({
    description: 'The transfer type ID',
    type: Number,
    example: 1,
  })
  tranferTypeId: number;

  @Field()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The value of the transaction',
    type: Number,
    example: 100,
  })
  value: number;
}

export class TransactionCreated {
  @ApiProperty({
    description: 'The external ID of the transaction',
    type: String,
    format: 'uuid',
    nullable: true,
    required: false,
  })
  externalId?: string | null;
  @ApiProperty({
    description: 'The external ID of the debit account',
    type: String,
    format: 'uuid',
  })
  accountExternalIdDebit: string;
  @ApiProperty({
    description: 'The external ID of the credit account',
    type: String,
    format: 'uuid',
  })
  accountExternalIdCredit: string;
  @ApiProperty({
    description: 'The transfer type ID',
    type: Number,
    example: 1,
  })
  tranferTypeId: number;
  @ApiProperty({
    description: 'The value of the transaction',
    type: Number,
    example: 100,
  })
  value: number;
  @ApiProperty({
    description: 'The date when the transaction was created',
    type: Date,
  })
  createdAt: Date;
}
