import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { BlogModule } from './modules/blog/blog.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production', '.env.development']
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.SERVER_DATABASE_HOST,
      port: parseInt(process.env.SERVER_DATABASE_PORT),
      username: process.env.SERVER_DATABASE_USERNAME,
      password: process.env.SERVER_DATABASE_PASSWORD,
      database: process.env.SERVER_DATABASE_DATABASE,
      entityPrefix: 'blog_',
      charset: 'utf8_general_ci',
      entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UserModule,
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
