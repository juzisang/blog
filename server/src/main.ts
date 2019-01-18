import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from '@app/pipes/validation.pipe';
import { ResponseInterceptor } from '@app/interceptors/response.interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  const options = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('user')
    .addTag('metas')
    .addTag('option')
    .addTag('article')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
