import {
  ClassSerializerInterceptor,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './nestjs-utils/filters/http-exception.filter';
import { PrismaClientExceptionFilter } from './nestjs-utils/filters/prisma-exception.filter';
import { ServiceLayerExceptionToHttpExceptionFilter } from './nestjs-utils/filters/service-layer-exception.filter';
import { UnhandledExceptionFilter } from './nestjs-utils/filters/unhandled-exception.filter';
import { ILoggerService } from './share-modules/logger/interface/logger-service.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get(ConfigService);
  const logger = app.get(ILoggerService);
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  if (['dev', 'test'].includes(configService.get('app.nodeEnv'))) {
    const config = new DocumentBuilder()
      .setTitle(configService.get('app.name'))
      .setDescription(`The ${configService.get('app.name')} API description`)
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(new UnhandledExceptionFilter(logger));
  app.useGlobalFilters(new ServiceLayerExceptionToHttpExceptionFilter());
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (BigInt.prototype as any).toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

  await app.listen(configService.get('app.port'));
}
bootstrap();
