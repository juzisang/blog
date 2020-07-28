import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
// import { TransformInterceptor } from './common/transform.interceptor';
// import { HttpExceptionFilter } from './common/http-exception.filter';
// import * as fs from 'fs-extra';
// import * as path from 'path';

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
  // app.useGlobalInterceptors(new TransformInterceptor())
  // 将错误转换为固定格式
  // app.useGlobalFilters(new HttpExceptionFilter())

  if (process.env.NODE_ENV === 'development') {
    // API 文档
    const options = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Blog API')
      .setDescription('The Blog API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
      // customCss: await fs.readFile(path.resolve('src/assets/theme-material.css'), 'utf-8')
    });
  }

  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
