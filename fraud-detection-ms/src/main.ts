import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { welcome } from '../welcome';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(getMicroservicesConfig());

  await app.startAllMicroservices();

  setGlobalModifiers(app);
  await app.listen(process.env.PORT);
  welcome();
}
bootstrap();

const getMicroservicesConfig = (): MicroserviceOptions => {
  return {
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID,
      },
      client: {
        brokers: process.env.KAFKA_BROKERS?.split(','),
      },
    },
  } as MicroserviceOptions;
};

const setGlobalModifiers = (appModule: INestApplication) => {
  appModule.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
    }),
  );
};
