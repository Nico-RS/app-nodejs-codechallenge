import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './infrastructure/controllers/health.controller';
import { HealthService } from './core/services/health.service';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNC === 'true',
      logging: true,
      keepConnectionAlive: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),

    CacheModule.register({
      ttl: 10,
      isGlobal: true,
    }),

    TransactionModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [],
})
export class AppModule {}
