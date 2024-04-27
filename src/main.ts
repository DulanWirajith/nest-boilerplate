import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CheckPayloadNotEmptyPipe } from './utils/pipes/check-payload-not-empty.pipe';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();

  enableCors(app);
  useGlobalPipes(app);

  const port: number = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

function enableCors(app) {
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: ['http://localhost:8090'],
    credentials: true,
  });
}

function useGlobalPipes(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
    new CheckPayloadNotEmptyPipe(),
  );
}

bootstrap();
