import { Module } from '@nestjs/common';
import { TransactionController } from './infrastructure/controllers/transaction.controller';
import { TransactionService } from './core/services/transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './core/entities/transaction.entity';
import { KafkaPort } from './infrastructure/port/kafka.port';
import { TransactionRepository } from './infrastructure/repositories/transaction.respository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionResolver } from './core/resolvers/transaction.resolver';

const services = [TransactionService];
const resolvers = [TransactionResolver];
const interfaces = [
  { provide: 'ITransactionRepository', useClass: TransactionRepository },
  { provide: 'IKafkaPort', useClass: KafkaPort },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    ClientsModule.register([
      {
        name: 'TRANSACTION_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: process.env.KAFKA_BROKERS?.split(','),
          },
        },
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [...services, ...interfaces, ...resolvers],
  exports: [TransactionService],
})
export class TransactionModule {}
