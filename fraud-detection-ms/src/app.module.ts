import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './infrastructure/controllers/health.controller';
import { HealthService } from './core/services/health.service';
import { AntiFraudModule } from './modules/anti-fraud/anti-fraud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AntiFraudModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
