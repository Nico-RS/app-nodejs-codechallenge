import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../entities/transaction.entity';
import {
  OutputTransactionType,
  TransactionType,
} from '../types/transaction.types';
import { OutputTransactionDto } from '../dtos/retrieve-transaction.dto';
import { CreateTransactionDto } from '../dtos/transaction.dto';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => [TransactionType])
  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionService.getAllTransactions();
  }

  @Query(() => OutputTransactionType)
  async getTransactionByExternalId(
    @Args('externalId') externalId: string,
  ): Promise<OutputTransactionDto> {
    return this.transactionService.getTransactionByExternalId(externalId);
  }

  @Mutation(() => TransactionType)
  async createTransaction(
    @Args('createTransactionDto') createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(createTransactionDto);
  }
}
