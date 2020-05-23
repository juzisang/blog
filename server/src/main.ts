import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { TransformInterceptor } from './common/transform.interceptor';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 过滤常见安全问题
  app.use(helmet());
  // 设置参数验证
  app.useGlobalPipes(new ValidationPipe());
  // cors
  app.enableCors({
    origin: process.env.NODE_ENV === 'development' ? '*' : process.env.BLOG_SITE_ORIGIN,
    credentials: true,
    maxAge: 60 * 60 * 24,
  });
  // 将返回数据转为为固定格式
  app.useGlobalInterceptors(new TransformInterceptor())
  // 将错误转换为固定格式
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
