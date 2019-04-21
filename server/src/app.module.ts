import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';

import { AuthModule } from '@app/modules/auth/auth.module';
import { ArticleModule } from '@app/modules/article/article.module';
import { TagModule } from '@app/modules/tag/tag.module';
import { CommentModule } from '@app/modules/comment/comment.module';
import { CategoryModule } from '@app/modules/category/category.module';

@Module({
  imports: [
    AuthModule,
    ArticleModule,
    CategoryModule,
    TagModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
