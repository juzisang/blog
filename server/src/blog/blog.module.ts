import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entity/article.entity';
import { CommentEntity } from './entity/comment.entity';
import { OptionEntity } from './entity/option.entity';
import { UserEntity } from './entity/user.entity';
import { ArticleController } from './controller/article.controller';
import { MetasController } from './controller/metas.controller';
import { CommentController } from './controller/comment.controller';
import { OptionController } from './controller/option.controller';
import { UserController } from './controller/user.controller';
import { ArticleService } from './service/article.service';
import { CommentService } from './service/comment.service';
import { OptionService } from './service/option.service';
import { UserService } from './service/user.service';
import { DEFAULT_DATA } from './../app.config';
import { MetasEntity } from './entity/metas.entity';
import { RelationshipsEntity } from './entity/relationships.entity';
import { MetasService } from './service/metas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      CommentEntity,
      OptionEntity,
      UserEntity,
      MetasEntity,
      RelationshipsEntity,
    ]),
  ],
  controllers: [
    ArticleController,
    MetasController,
    CommentController,
    OptionController,
    UserController,
  ],
  providers: [
    ArticleService,
    CommentService,
    OptionService,
    UserService,
    MetasService,
  ],
})
export class BlogModule implements OnModuleInit {
  constructor(private readonly userService: UserService) {}

  async onModuleInit() {
    await this.createDefaultUser();
  }

  /**
   * 创建默认用户
   */
  async createDefaultUser() {
    if (await this.userService.IsEmptyUsers()) {
      await this.userService.created({
        name: DEFAULT_DATA.user.name,
        email: DEFAULT_DATA.user.email,
        password: DEFAULT_DATA.user.password,
        group: DEFAULT_DATA.user.group,
      });
    }
  }
}
