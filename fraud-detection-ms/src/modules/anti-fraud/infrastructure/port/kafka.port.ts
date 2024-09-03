import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class KafkaPort {
  constructor(
    @Inject('FRAUD_DETECTION_KAFKA_SERVICE')
    private readonly kafkaClient: ClientProxy,
  ) {}

  async sendMessage(topic: string, payload: object): Promise<Observable<any>> {
    return this.kafkaClient.emit(topic, payload);
  }
}
