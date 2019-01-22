import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { MetasEntity } from '../metas/metas.entity';
import { RelationshipsEntity } from '../metas/relationships.entity';
import { UserService } from '../user/user.service';
import { PaginationDto } from './pagination.dto';
import { SaveArticleDto } from './article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntity: Repository<ArticleEntity>,
    @InjectRepository(MetasEntity)
    private readonly metasEntity: Repository<MetasEntity>,
    @InjectRepository(RelationshipsEntity)
    private readonly relationshipsEntity: Repository<RelationshipsEntity>,
    private readonly userService: UserService,
  ) {}

  /**
   * 创建文章
   */
  async create(dto: SaveArticleDto) {
    const { uid } = await this.userService.findRoot();
    // 文章
    const article = this.articleEntity.create({
      ...dto,
      uid,
    });
    const metas = await this.metasEntity.findByIds([...dto.tags, dto.category]);
    const category = metas.filter(meta => meta.type === 'category');
    const tags = metas.filter(meta => meta.type === 'tag');
    // 开启事务
    await this.articleEntity.manager.transaction(async entityManager => {
      // 存储文章
      const { aid } = await entityManager.save(article);
      // metas
      await entityManager.save(tags.map(({ mid }) => this.relationshipsEntity.create({ aid, mid })));
      await entityManager.save(category.map(({ mid }) => this.relationshipsEntity.create({ aid, mid })));
    });
  }

  /**
   * 更新文章
   */
  async update(aid: number, dto: SaveArticleDto) {
    const article = await this.articleEntity.findOne(aid);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    // 新Meta
    const newMetas = await this.metasEntity.findByIds([...dto.tags, dto.category]);
    const newCategory = newMetas.filter(meta => meta.type === 'category').map(item => item.mid);
    const newTags = newMetas.filter(meta => meta.type === 'tag').map(item => item.mid);

    // 旧Meta
    const oldMetas = await this.relationshipsEntity
      .createQueryBuilder('relationships')
      .select(['relationships.mid as mid', 'metas.type as type'])
      .innerJoin(ArticleEntity, 'article', 'article.aid = relationships.aid')
      .innerJoin(MetasEntity, 'metas', 'metas.mid = relationships.mid')
      .where('article.aid = :aid', { aid })
      .getRawMany();
    const oldCategory = oldMetas.filter(meta => meta.type === 'category').map(item => item.mid);
    const oldTags = oldMetas.filter(meta => meta.type === 'tag').map(item => item.mid);

    // 判断是否有更改
    const isUpdateMeta = type => {
      const obj = { tag: { old: oldTags, new: newTags }, category: { old: oldCategory, new: newCategory } };
      return obj[type].old.sort().join() !== obj[type].new.sort().join();
    };

    // 开启事务
    await this.metasEntity.manager.transaction(async entityManager => {
      // 判断是否设置分类，以及是否改变
      if (newCategory.length > 0 && isUpdateMeta('category')) {
        await entityManager.delete(RelationshipsEntity, oldCategory.map(mid => ({ mid, aid })) as any);
        await entityManager.save(newCategory.map(mid => this.relationshipsEntity.create({ aid, mid })));
      }
      if (newTags.length > 0 && isUpdateMeta('tag')) {
        await entityManager.delete(RelationshipsEntity, oldTags.map(mid => ({ mid, aid })) as any);
        await entityManager.save(newTags.map(mid => this.relationshipsEntity.create({ aid, mid })));
      }
      await entityManager.update(ArticleEntity, aid, { ...dto });
    });
  }

  /**
   * 获取文章详情
   */
  async findOne(aid: number) {
    const user = await this.userService.findRoot();
    if (!(await this.articleEntity.findOne(aid))) {
      throw new BadRequestException('文章不存在');
    }
    const article: any = await this.articleEntity
      .createQueryBuilder('article')
      .addSelect('article.content')
      .where('article.uid = :uid AND article.aid = :aid', { uid: user.uid, aid })
      .leftJoinAndSelect(RelationshipsEntity, 'relationships', 'article.aid = relationships.aid')
      .leftJoinAndMapMany('article.metas', MetasEntity, 'metas', 'relationships.mid = metas.mid')
      .getOne();
    return this.mapMetas(article);
  }

  /**
   * 获取文章列表
   */
  async findList(state, dto: PaginationDto) {
    const { uid } = await this.userService.findRoot();
    const [list, count] = await this.articleEntity
      .createQueryBuilder('article')
      .where('article.uid = :uid AND article.state = :state', { uid, state })
      .leftJoinAndSelect(RelationshipsEntity, 'relationships', 'article.aid = relationships.aid')
      .leftJoinAndMapMany('article.metas', MetasEntity, 'metas', 'relationships.mid = metas.mid')
      .orderBy('article.create_time', 'DESC')
      .skip((dto.index - 1) * dto.size)
      .take(dto.size)
      .getManyAndCount();
    return {
      list: list.map((item: any) => this.mapMetas(item)),
      pagination: {
        size: dto.size * 1,
        index: dto.index * 1,
        count,
      },
    };
  }

  /**
   * 删除文章
   */
  async delete(aid: number) {
    const article = await this.articleEntity.findOne(aid);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    await this.articleEntity.update(article.aid, {
      state: 'delete',
    });
  }

  /**
   * 分开 tags category
   */
  private mapMetas(article: any) {
    article.tags = article.metas.filter(meta => meta.type === 'tag');
    article.category = article.metas.filter(meta => meta.type === 'category').reduce((a, b) => b, null);
    delete article.metas;
    return article;
  }
}
