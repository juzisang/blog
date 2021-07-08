import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import helmet from 'helmet'
import { config } from './app.config'
import { TransformInterceptor } from './util/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})
  // 设置路由前缀
  app.setGlobalPrefix('api')
  // 过滤常见安全问题
  app.use(helmet())
  // 设置参数验证
  app.useGlobalPipes(new ValidationPipe())
  // cors
  app.enableCors({
    origin: (url, cb) => cb(null, config.NODE_ENV === 'development' ? url : config.BLOG_SITE_ORIGIN),
    credentials: true,
    maxAge: 60 * 60 * 24,
  })
  // 将数据格式转换位固定格式
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(config.APP_PORT)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
