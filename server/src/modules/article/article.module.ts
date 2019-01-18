import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { MetasEntity } from '../metas/metas.entity';
import { RelationshipsEntity } from '../metas/relationships.entity';
import { UserEntity } from '../user/user.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      MetasEntity,
      RelationshipsEntity,
      UserEntity,
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, UserService],
})
export class ArticleModule {}
