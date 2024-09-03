import { InjectEntityManager } from '@nestjs/typeorm';
import { ITransactionRepository } from '../../core/interfaces/repositories';
import { EntityManager } from 'typeorm';
import { Transaction } from '../../core/entities/transaction.entity';

export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getAllTransactions(): Promise<Transaction[]> {
    return this.entityManager
      .getRepository(Transaction)
      .createQueryBuilder()
      .select()
      .getMany();
  }

  async createTransaction(
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    return this.entityManager.getRepository(Transaction).save(transaction);
  }

  async getTransactionByExternalId(externalId: string): Promise<Transaction> {
    return this.entityManager
      .getRepository(Transaction)
      .createQueryBuilder()
      .where('externalId = :externalId', { externalId })
      .getOne();
  }
}
