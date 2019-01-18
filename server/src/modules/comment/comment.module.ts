import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentEntity } from './comment.entity';
import { ArticleEntity } from '../article/article.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, ArticleEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
