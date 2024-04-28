import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { CheckPayloadNotEmptyPipe } from './utils/pipes/check-payload-not-empty.pipe';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const port: number = configService.get<number>('PORT');

  enableCors(app);
  useGlobalPipes(app);
  setupSwagger(app, configService);

  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

function enableCors(app: INestApplication) {
  app.enableCors({
    allowedHeaders: ['content-type', 'authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: ['http://localhost:8090'],
    credentials: true,
  });
}

function useGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
    new CheckPayloadNotEmptyPipe(),
  );
}

function setupSwagger(app: INestApplication, configService: ConfigService) {
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('SWAGGER_TITLE'))
    .setDescription(configService.get<string>('SWAGGER_DESCRIPTION'))
    .setVersion(configService.get<string>('SWAGGER_VERSION'))
    .addTag(configService.get<string>('SWAGGER_TAG'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
}

bootstrap();
