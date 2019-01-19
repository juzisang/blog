import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { DB } from '@app/app.config';

import { ArticleModule } from '@app/modules/article/article.module';
import { AuthModule } from '@app/modules/auth/auth.module';
import { CommentModule } from '@app/modules/comment/comment.module';
import { MetasModule } from '@app/modules/metas/metas.module';
import { OptionModule } from '@app/modules/option/option.module';
import { UserModule } from '@app/modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(DB), AuthModule, ArticleModule, CommentModule, MetasModule, OptionModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
