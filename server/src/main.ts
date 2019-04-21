import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { isDev, config } from '@app/app.env';
import { AppModule } from '@app/app.module';
import { TransformInterceptor } from '@app/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // validation
  app.useGlobalPipes(new ValidationPipe());
  // transform
  app.useGlobalInterceptors(new TransformInterceptor());
  // cors
  app.enableCors({
    origin: isDev ? '*' : config.BLOG_SITE_ORIGIN,
    credentials: true,
    maxAge: 60 * 60 * 24,
  });
  await app.listen(3000);
}
bootstrap();
