import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { ValidationPipe } from '@app/pipes/validation.pipe';
import { ResponseInterceptor } from '@app/interceptors/response.interceptor';

import { AppModule } from './app.module';

import { ENV, APP } from '@app/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableCors({
    origin: ENV.isDev ? '*' : APP.origin,
    credentials: true,
    maxAge: 60 * 60 * 24,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  if (ENV.isDev) {
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
  }

  await app.listen(APP.host);
}

bootstrap();
