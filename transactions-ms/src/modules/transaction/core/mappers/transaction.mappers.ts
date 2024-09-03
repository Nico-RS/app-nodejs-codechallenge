import { OutputTransactionDto } from '../dtos/retrieve-transaction.dto';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { Transaction } from '../entities/transaction.entity';
import { StatusesEnum, TransactionTypeEnums } from '../enums/event.enum';

export const transactionMapper = (
  transactionData: CreateTransactionDto,
): Partial<Transaction> => {
  const { value, ...rest } = transactionData;

  return {
    transactionValue: value,
    transactionStatusId: StatusesEnum.PENDING,
    ...rest,
  };
};

export const retrieveTransactionMapper = (
  transactionData: Transaction,
): OutputTransactionDto => {
  const {
    externalId,
    tranferTypeId,
    transactionStatusId,
    transactionValue,
    createdAt,
  } = transactionData;

  return {
    transactionExternalId: externalId,
    transactionType: {
      name: TransactionTypeEnums[tranferTypeId] ?? '',
    },
    transactionStatus: {
      name: StatusesEnum[transactionStatusId] ?? '',
    },
    value: transactionValue,
    createdAt,
  };
};
