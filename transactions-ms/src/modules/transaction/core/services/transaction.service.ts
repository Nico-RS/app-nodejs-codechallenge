import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Transaction } from '../entities/transaction.entity';
import { ITransactionRepository } from '../interfaces/repositories';
import { CreateTransactionDto } from '../dtos/transaction.dto';
import { IKafkaPort } from '../interfaces/ports/transactions.kafka';
import {
  retrieveTransactionMapper,
  transactionMapper,
} from '../mappers/transaction.mappers';
import { OutputTransactionDto } from '../dtos/retrieve-transaction.dto';
import { StatusesEnum } from '../enums/event.enum';
import { KafkaTopics } from '../enums/kafka.enum';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
    @Inject('IKafkaPort')
    private readonly kafkaPort: IKafkaPort,
  ) {}

  async getAllTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.getAllTransactions();
  }

  async processTransactionAproved(transactionData: Transaction): Promise<void> {
    transactionData.transactionStatusId = StatusesEnum.APPROVED;
    await this.createTransactionInDB(transactionData);
    this.logger.log(transactionData);
  }

  async processTransactionRejected(
    transactionData: Transaction,
  ): Promise<void> {
    transactionData.transactionStatusId = StatusesEnum.REJECTED;
    await this.createTransactionInDB(transactionData);
    this.logger.log(transactionData);
  }

  async getTransactionByExternalId(
    externalId: string,
  ): Promise<OutputTransactionDto> {
    const transaction =
      await this.transactionRepository.getTransactionByExternalId(externalId);

    if (!transaction) throw new NotFoundException('Transaction not found');

    return retrieveTransactionMapper(transaction);
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transactionData = transactionMapper(createTransactionDto);

    const transactionCreated =
      await this.createTransactionInDB(transactionData);

    if (!transactionCreated)
      throw new NotFoundException('Transaction not created');

    this.sendMessageToKafka(
      KafkaTopics.TRANSACTION_CREATED,
      transactionCreated,
    );

    return transactionCreated;
  }

  private async createTransactionInDB(
    transactionData: Partial<Transaction>,
  ): Promise<Transaction> {
    try {
      return await this.transactionRepository.createTransaction(
        transactionData,
      );
    } catch (error) {
      throw new BadRequestException(
        `Error creating transaction: ${error.message}`,
      );
    }
  }

  private async sendMessageToKafka(topic: string, message: any): Promise<void> {
    try {
      await this.kafkaPort.sendMessage(topic, message);
      this.logger.log('Message sent to kafka successfully');
    } catch (error) {
      throw new ConflictException(`Error sending message to kafka ${error}`);
    }
  }
}
