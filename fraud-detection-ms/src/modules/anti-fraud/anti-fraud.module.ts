import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AntiFraudController } from './infrastructure/controllers/anti-fraud.controller';
import { AntiFraudService } from './core/services/anti-fraud.service';
import { KafkaPort } from './infrastructure/port/kafka.port';

const services = [AntiFraudService];
const interfaces = [{ provide: 'IKafkaPort', useClass: KafkaPort }];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ClientsModule.register([
      {
        name: 'FRAUD_DETECTION_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: process.env.KAFKA_BROKERS?.split(','),
          },
        },
      },
    ]),
  ],
  controllers: [AntiFraudController],
  providers: [...services, ...interfaces],
})
export class AntiFraudModule {}
