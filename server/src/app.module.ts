import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './modules/blog/blog.module';
import { UserModule } from './modules/user/user.module';
import { UserEntity } from './modules/user/user.entity';
import { CategoryEntity } from './modules/blog/entity/category.entity';
import { ContentEntity } from './modules/blog/entity/content.entity';
import { TagEntity } from './modules/blog/entity/tag.entity';
import { CommentEntity } from './modules/blog/entity/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.production', '.env.development']
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entityPrefix: 'blog_',
      charset: 'utf8_general_ci',
      entities: [
        UserEntity,
        CategoryEntity,
        ContentEntity,
        TagEntity,
        CommentEntity
      ],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
