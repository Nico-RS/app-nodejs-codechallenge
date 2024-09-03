import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../core/entities/transaction.entity';
import {
  CreateTransactionDto,
  TransactionCreated,
} from '../../core/dtos/transaction.dto';
import { OutputTransactionDto } from '../../core/dtos/retrieve-transaction.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from '../../core/enums/kafka.enum';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('transactions')
@Controller('transaction')
@UseInterceptors(CacheInterceptor)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'Return all transactions',
    type: [TransactionCreated],
  })
  getAllTransactions(): Promise<Transaction[]> {
    return this.transactionService.getAllTransactions();
  }

  @Get(':externalId')
  @ApiOperation({ summary: 'Get transaction by external ID' })
  @ApiParam({
    name: 'externalId',
    description: 'External ID of the transaction',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the transaction',
    type: OutputTransactionDto,
  })
  getTransactionById(
    @Param('externalId') externalId: string,
  ): Promise<OutputTransactionDto> {
    return this.transactionService.getTransactionByExternalId(externalId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @ApiResponse({
    status: 201,
    description: 'The transaction has been successfully created.',
    type: TransactionCreated,
  })
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @MessagePattern(KafkaTopics.TRANSACTION_APROVED)
  transactionAproved(@Payload() message: Transaction): void {
    this.transactionService.processTransactionAproved(message);
  }

  @MessagePattern(KafkaTopics.TRANSACTION_REJECTED)
  transactionRejected(@Payload() message: Transaction): void {
    this.transactionService.processTransactionRejected(message);
  }
}
