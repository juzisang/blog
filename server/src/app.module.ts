import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DB } from '@app/app.config';
import { DEFAULT_DATA } from '@app/app.config';

import { ArticleModule } from '@app/modules/article/article.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { CommentModule } from '@app/modules/comment/comment.module';
import { MetasModule } from '@app/modules/metas/metas.module';
import { OptionModule } from '@app/modules/option/option.module';
import { UserModule } from '@app/modules/user/user.module';
import { HelperModule } from '@app/modules/helper/helper.module';
import { UserService } from './modules/user/user.service';
import { OptionService } from './modules/option/option.service';

@Module({
  imports: [TypeOrmModule.forRoot(DB), AuthModule, UserModule, MetasModule, OptionModule, ArticleModule, CommentModule, HelperModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userService: UserService, private readonly optionService: OptionService) {}

  async onModuleInit() {
    await this.createDefaultUser();
    await this.createDefaultOption();
  }

  /**
   * 创建默认用户
   */
  async createDefaultUser() {
    if (await this.userService.IsEmptyUsers()) {
      await this.userService.createdAdmin({
        name: DEFAULT_DATA.user.name,
        password: DEFAULT_DATA.user.password,
      });
    }
  }

  /**
   * 默认配置
   */
  async createDefaultOption() {
    const { option } = DEFAULT_DATA;
    if (!(await this.optionService.findOption())) {
      await this.optionService.saveOption(option);
    }
  }
}
