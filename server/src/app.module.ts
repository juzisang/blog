import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import { DBModule } from './db.module';

import { AuthModule } from '@app/modules/auth/auth.module';
import { ArticleModule } from '@app/modules/article/article.module';
import { MetasModule } from '@app/modules/metas/metas.module';
import { CommentModule } from '@app/modules/comment/comment.module';

@Module({
  imports: [DBModule, AuthModule, ArticleModule, MetasModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
