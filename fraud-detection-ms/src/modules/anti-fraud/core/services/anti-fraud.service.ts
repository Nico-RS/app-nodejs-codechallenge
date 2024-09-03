import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionDto } from 'src/modules/anti-fraud/core/dtos/transaction.dto';
import { IKafkaPort } from '../interfaces/ports/transactions.kafka';
import { KafkaTopics } from '../enums/kafka.enum';

@Injectable()
export class AntiFraudService {
  private readonly logger = new Logger(AntiFraudService.name);

  constructor(
    @Inject('IKafkaPort')
    private readonly kafkaPort: IKafkaPort,
  ) {}

  validateTransaction(transaction: TransactionDto): void {
    try {
      const externalId = uuidv4();
      transaction.externalId = externalId;

      if (transaction.transactionValue > 1000) {
        this.sendMessageToKafka(KafkaTopics.TRANSACTION_REJECTED, transaction);
      } else {
        this.sendMessageToKafka(KafkaTopics.TRANSACTION_APROVED, transaction);
      }
    } catch (error) {
      console.error('Error validating the transaction', error);
    }
  }

  async sendMessageToKafka(topic: string, message: any): Promise<void> {
    try {
      await this.kafkaPort.sendMessage(topic, message);
      this.logger.log('Message sent to kafka successfully');
    } catch (error) {
      throw new ConflictException(`Error sending message to kafka ${error}`);
    }
  }
}
