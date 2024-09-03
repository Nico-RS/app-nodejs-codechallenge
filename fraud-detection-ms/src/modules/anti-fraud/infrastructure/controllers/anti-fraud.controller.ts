// kafka.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AntiFraudService } from '../../core/services/anti-fraud.service';
import { TransactionDto } from 'src/modules/anti-fraud/core/dtos/transaction.dto';
import { KafkaTopics } from '../../core/enums/kafka.enum';

@Controller()
export class AntiFraudController {
  constructor(private readonly antiFraudService: AntiFraudService) {}
  @MessagePattern(KafkaTopics.TRANSACTION_CREATED)
  async handleMessage(@Payload() message: TransactionDto) {
    Logger.log('Message received from Kafka', AntiFraudController.name);

    this.antiFraudService.validateTransaction(message);
  }
}
