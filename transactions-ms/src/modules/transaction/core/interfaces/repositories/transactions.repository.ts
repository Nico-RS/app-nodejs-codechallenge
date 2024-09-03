import { Transaction } from '../../entities/transaction.entity';

export interface ITransactionRepository {
  getAllTransactions(): Promise<Transaction[]>;
  createTransaction(transaction: Partial<Transaction>): Promise<Transaction>;
  getTransactionByExternalId(externalId: string): Promise<Transaction>;
}
