import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from './article.dto';
import { RelationshipsEntity } from './relationships.entity';
import { MetasEntity } from '@app/modules/metas/metas.entity';
import { PaginationDto } from '@app/common/pagination.dto';

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
        )
        .then(() => null);
    });
  }

  updateArticle(id: number, dto: ArticleDto) {
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
            .then(() => entityManager.save<RelationshipsEntity>(entityManager.create<RelationshipsEntity>(RelationshipsEntity, [...dto.tags.map(tag => ({ mid: tag, aid: id })), { mid: dto.category, aid: id }])))
            .then(() => null)
        );
      }),
    );
  }

  getArticles(dto: PaginationDto) {
    return Promise.resolve()
      .then(() =>
        this.articleEntity
          .createQueryBuilder('article')
          .leftJoin(RelationshipsEntity, 'relationships', 'relationships.aid = article.id')
          .leftJoinAndMapMany('article.metas', MetasEntity, 'metas', 'metas.id = relationships.mid')
          .skip((dto.page - 1) * dto.size)
          .take(dto.size)
          .orderBy('article.utime', 'DESC')
          .getManyAndCount(),
      )
      .then(([list, count]) => {
        list.map((entity: any) => {
          entity.tags = entity.metas.filter(item => item.type === 'tag');
          entity.category = entity.metas.find(item => item.type === 'category');
          delete entity.metas;
          return entity;
        });
        return {
          list,
          pagination: {
            page: dto.page * 1,
            size: dto.size * 1,
            count: count * 1,
          },
        };
      });
  }

  getArticle(id: number) {
    return this.articleEntity
      .findOneOrFail(id)
      .then(() =>
        this.articleEntity
          .createQueryBuilder('article')
          .addSelect('article.content')
          .leftJoin(RelationshipsEntity, 'relationships', 'relationships.aid = article.id')
          .leftJoinAndMapMany('article.metas', MetasEntity, 'metas', 'metas.id = relationships.mid')
          .where('article.id = :id', { id })
          .getOne(),
      )
      .then((entity: any) => {
        entity.tags = entity.metas.filter(item => item.type === 'tag');
        entity.category = entity.metas.find(item => item.type === 'category');
        delete entity.metas;
        return entity;
      });
  }
}
