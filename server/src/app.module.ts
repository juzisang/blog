import { CommentController } from './controller/comment.controller'
import { CommentService } from './service/comment.service'
import { CacheModule, Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AppController } from './app.controller'
import { ArticleEntity } from './entity/article.entity'
import { OptionsEntity } from './entity/options.entity'
import { UserEntity } from './entity/user.entity'
import { JwtStrategy } from './util/jwt.strategy'
import { UserService } from './service/user.service'
import { config } from './app.config'
import { UserController } from './controller/user.controller'
import { OptionsController } from './controller/options.controller'
import { OptionsService } from './service/options.service'
import { TagController } from './controller/tag.controller'
import { CategoryController } from './controller/category.controller'
import { ArticleController } from './controller/article.controller'
import { ArticleService } from './service/article.service'
import { TagEntity } from './entity/tag.entity'
import { CategoryEntity } from './entity/category.entity'
import { CommentEntity } from './entity/comment.entity'
import { TagService } from './service/tag.service'
import { CategoryService } from './service/category.service'

const entities = [ArticleEntity, OptionsEntity, UserEntity, TagEntity, CategoryEntity, CommentEntity]

@Module({
  imports: [
    PassportModule,
    CacheModule.register(),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
    TypeOrmModule.forFeature(entities),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.DATABASE_HOST,
      port: config.DATABASE_PORT,
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_DATABASE,
      entityPrefix: 'blog_',
      charset: 'utf8_general_ci',
      entities,
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [CommentController, AppController, UserController, OptionsController, TagController, CategoryController, ArticleController],
  providers: [CommentService, JwtStrategy, UserService, OptionsService, TagService, CategoryService, ArticleService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  onModuleInit() {
    this.userService.initAdmin()
  }
}
