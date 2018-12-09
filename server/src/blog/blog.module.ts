import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entity/article.entity';
import { CommentEntity } from './entity/comment.entity';
import { OptionEntity } from './entity/option.entity';
import { UserEntity } from './entity/user.entity';
import { ArticleController } from './controller/article.controller';
import { CategoryController } from './controller/category.controller';
import { CommentController } from './controller/comment.controller';
import { OptionController } from './controller/option.controller';
import { TagController } from './controller/tag.controller';
import { UserController } from './controller/user.controller';
import { ArticleService } from './service/article.service';
import { CommentService } from './service/comment.service';
import { OptionService } from './service/option.service';
import { UserService } from './service/user.service';
import { DEFAULT_DATA } from './../app.config';
import { MetasEntity } from './entity/metas.entity';
import { RelationshipsEntity } from './entity/relationships.entity';

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
    CategoryController,
    CommentController,
    OptionController,
    TagController,
    UserController,
  ],
  providers: [ArticleService, CommentService, OptionService, UserService],
})
export class BlogModule implements OnModuleInit {
  constructor(
    private readonly userService: UserService,
    private readonly optionService: OptionService,
  ) {}

  onModuleInit() {
    this.createDefaultUser();
    // this.createDefaultOption();
  }

  /**
   * 创建默认用户
   */
  async createDefaultUser() {
    if (await this.userService.IsEmptyUsers()) {
      await this.userService.createdUser({
        name: DEFAULT_DATA.user.name,
        email: DEFAULT_DATA.user.email,
        password: DEFAULT_DATA.user.password,
      });
    }
  }

  //   async createDefaultOption() {
  //     if (!(await this.optionService.findOneOption())) {
  //       this.optionService.createdOption({
  //         ...DEFAULT_DATA.option,
  //       });
  //     }
  //   }
}
