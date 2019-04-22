import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { RelationshipsEntity } from './relationships.entity';
import { ArticleDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntity: Repository<ArticleEntity>,
  ) {}

  addArticle(dto: ArticleDto) {
    return this.articleEntity.manager.transaction(entityManager => {
      return entityManager
        .save<ArticleEntity>(
          entityManager.create<ArticleEntity>(ArticleEntity, {
            title: dto.title,
            content: dto.content,
            thumb: dto.thumb,
            state: dto.state as any,
            keywords: dto.keywords,
            description: dto.description,
          }),
        )
        .then(article =>
          entityManager.save<RelationshipsEntity>(
            entityManager.create<RelationshipsEntity>(RelationshipsEntity, [
              ...dto.tags.map(tag => ({ mid: tag, aid: article.id })),
              {
                mid: dto.category,
                aid: article.id,
              },
            ]),
          ),
        );
    });
  }

  editArticle(id: number, dto: ArticleDto) {
    return this.articleEntity.findOneOrFail(id).then(() =>
      this.articleEntity.manager.transaction(entityManager => {
        return (
          entityManager
            // 更新文章
            .update<ArticleEntity>(
              ArticleEntity,
              id,
              entityManager.create<ArticleEntity>(ArticleEntity, {
                title: dto.title,
                content: dto.content,
                thumb: dto.thumb,
                state: dto.state as any,
                keywords: dto.keywords,
                description: dto.description,
              }),
            )
            .then(() => entityManager.find<RelationshipsEntity>(RelationshipsEntity, { where: { aid: id } }))
            // 删除标签 & 分类
            .then(list => entityManager.remove<RelationshipsEntity>(RelationshipsEntity, list))
            // 重新建立关系
            .then(() =>
              entityManager.save<RelationshipsEntity>(
                entityManager.create<RelationshipsEntity>(RelationshipsEntity, [...dto.tags.map(tag => ({ mid: tag, aid: id })), { mid: dto.category, aid: id }]),
              ),
            )
        );
      }),
    );
  }
}
