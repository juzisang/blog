import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { isDev, config } from '@app/app.env';
import { AppModule } from '@app/app.module';
import { TransformInterceptor } from '@app/interceptors/transform.interceptor';
import { HttpExceptionFilter } from '@app/interceptors/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // transform
  app.useGlobalInterceptors(new TransformInterceptor());
  // error filter
  app.useGlobalFilters(new HttpExceptionFilter());
  // cors
  app.enableCors({
    origin: isDev ? '*' : config.BLOG_SITE_ORIGIN,
    credentials: true,
    maxAge: 60 * 60 * 24,
  });
  await app.listen(8300);
}
bootstrap();
