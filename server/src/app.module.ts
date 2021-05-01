import { Module, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AppController } from './app.controller'
import { ArticleEntity } from './entity/article.entity'
import { ArticleMetaRelationEntity } from './entity/article_meta_relation.entity'
import { OptionsEntity } from './entity/options.entity'
import { MetaEntity } from './entity/meta.entity'
import { UserEntity } from './entity/user.entity'
import { JwtStrategy } from './util/jwt.strategy'
import { UserService } from './service/user.service'
import { config } from './app.config'
import { UserController } from './controller/user.controller'
import { OptionsController } from './controller/options.controller'
import { OptionsService } from './service/options.service'
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: config.JWT_SECRET,
        signOptions: { expiresIn: '7d' },
      }),
    }),
    TypeOrmModule.forFeature([
      ArticleEntity,
      ArticleMetaRelationEntity,
      OptionsEntity,
      MetaEntity,
      UserEntity,
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.DATABASE_HOST,
      port: config.DATABASE_PORT,
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_DATABASE,
      entityPrefix: 'blog_',
      charset: 'utf8_general_ci',
      entities: [
        ArticleEntity,
        ArticleMetaRelationEntity,
        OptionsEntity,
        MetaEntity,
        UserEntity,
      ],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController, UserController, OptionsController],
  providers: [JwtStrategy, UserService, OptionsService],
})
export class AppModule implements OnModuleInit {

  constructor (private readonly userService: UserService) { }

  onModuleInit () {
    this.userService.initAdmin()
  }
}
