import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  // app.useGlobalGuards(new ApiKeyGuard());

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const openApiOptions: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('ILoveCoffee')
    .setDescription('Coffee Application')
    .setVersion('1.0')
    .build();

  const openApiDocument: OpenAPIObject = SwaggerModule.createDocument(
    app,
    openApiOptions,
  );
  SwaggerModule.setup('api', app, openApiDocument);

  await app.listen(3000);
}
bootstrap();
