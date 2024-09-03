import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class TransactionTypeName {
  @Field()
  name: string;
}

@ObjectType()
export class TransactionStatusName {
  @Field()
  name: string;
}

@ObjectType()
export class TransactionType {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  externalId: string;

  @Field()
  accountExternalIdDebit: string;

  @Field()
  accountExternalIdCredit: string;

  @Field()
  tranferTypeId: number;

  @Field()
  transactionStatusId: number;

  @Field()
  transactionValue: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class OutputTransactionType {
  @Field()
  transactionExternalId: string;

  @Field(() => TransactionTypeName)
  transactionType: TransactionTypeName;

  @Field(() => TransactionStatusName)
  transactionStatus: TransactionStatusName;

  @Field()
  value: number;

  @Field()
  createdAt: Date;
}
