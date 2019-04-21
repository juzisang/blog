import { isDev, config } from './app.env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors
  app.enableCors({
    origin: isDev ? '*' : config.BLOG_SITE_ORIGIN,
    credentials: true,
    maxAge: 60 * 60 * 24,
  });
  await app.listen(3000);
}
bootstrap();
