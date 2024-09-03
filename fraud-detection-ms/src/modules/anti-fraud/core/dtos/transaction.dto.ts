import { IsUUID, IsInt, IsDecimal, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class TransactionDto {
  @IsUUID()
  externalId?: string;

  @IsUUID()
  accountExternalIdDebit: string;

  @IsUUID()
  accountExternalIdCredit: string;

  @IsInt()
  tranferTypeId: number;

  @IsInt()
  transactionStatusId: number;

  @IsDecimal()
  transactionValue: number;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
