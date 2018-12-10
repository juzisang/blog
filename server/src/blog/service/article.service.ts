import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto, UpDateArticleDto } from '../dto/article.dto';
import { MetasEntity } from '../entity/metas.entity';
import { RelationshipsEntity } from '../entity/relationships.entity';
import { UserService } from './user.service';
import { PaginationDto } from '../dto/pagination.dto';

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

  private async createMetas(aid: number, dto: any) {
    const metas = [];
    // 添加Tags
    if (dto.tags) {
      metas.push(...dto.tags);
    }
    // 添加分类
    if (dto.category) {
      metas.push(dto.category);
    }
    if (metas.length === 0) {
      return;
    }
    const metaEns = await this.metasEntity.findByIds(metas);
    await this.relationshipsEntity.save(
      metaEns.map(meta =>
        this.relationshipsEntity.create({
          mid: meta.mid,
          aid,
        }),
      ),
    );
  }

  private mapMetas(article: any) {
    article.tags = article.metas.filter(meta => meta.type === 'tag');
    const category = article.metas.filter(meta => meta.type === 'category');
    article.category = category.length > 0 ? category[0] : null;
    delete article.metas;
    return article;
  }

  async create(uid: number, dto: CreateArticleDto) {
    // 创建文章
    const article = await this.articleEntity.save(
      this.articleEntity.create({
        ...dto,
        uid,
        views: 0,
      }),
    );
    await this.createMetas(article.aid, dto);
    return '添加成功';
  }

  async update(aid: number, dto: UpDateArticleDto) {
    const article = await this.articleEntity.findOne(aid);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    if (dto.tags || dto.category) {
      const metas = await this.relationshipsEntity
        .createQueryBuilder('relationships')
        .leftJoinAndMapOne(
          'relationships.type',
          MetasEntity,
          'metas',
          'relationships.mid = metas.mid',
        )
        .where('relationships.aid = :aid', { aid })
        .getMany();
      const removeMetas = [];
      // 删除tag
      if (dto.tags) {
        removeMetas.push(
          ...metas.filter((item: any) => item.type.type === 'tag'),
        );
      }
      // 删除category
      if (dto.category) {
        removeMetas.push(
          ...metas.filter((item: any) => item.type.type === 'category'),
        );
      }
      // 删除
      if (removeMetas.length > 0) {
        await this.relationshipsEntity.remove(removeMetas);
        // 重新生成
        await this.createMetas(aid, dto);
      }
    }
    // 更新
    await this.articleEntity.update(
      article.aid,
      this.articleEntity.create(dto),
    );
    return '更新成功';
  }

  async findOne(aid: number) {
    const user = await this.userService.findRoot();

    if (!(await this.articleEntity.findOne(aid))) {
      throw new BadRequestException('文章不存在');
    }

    const article: any = await this.articleEntity
      .createQueryBuilder('article')
      .addSelect('article.content')
      .where('article.uid = :uid AND article.aid = :aid', {
        uid: user.uid,
        aid,
      })
      .leftJoinAndSelect(
        RelationshipsEntity,
        'relationships',
        'article.aid = relationships.aid',
      )
      .leftJoinAndMapMany(
        'article.metas',
        MetasEntity,
        'metas',
        'relationships.mid = metas.mid',
      )
      .getOne();
    return this.mapMetas(article);
  }

  async findList(state, dto: PaginationDto) {
    const { uid } = await this.userService.findRoot();
    const articles = await this.articleEntity
      .createQueryBuilder('article')
      .where('article.uid = :uid AND article.state = :state', {
        uid,
        state,
      })
      .leftJoinAndSelect(
        RelationshipsEntity,
        'relationships',
        'article.aid = relationships.aid',
      )
      .leftJoinAndMapMany(
        'article.metas',
        MetasEntity,
        'metas',
        'relationships.mid = metas.mid',
      )
      .orderBy('article.create_time', 'DESC')
      .skip((dto.index - 1) * dto.size)
      .take(dto.size)
      .getMany();
    return {
      list: articles.map((item: any) => this.mapMetas(item)),
      pagination: {
        size: dto.size * 1,
        index: dto.index * 1,
        count: await this.articleEntity.count({ uid, state }),
      },
    };
  }

  async delete(aid: number) {
    const article = await this.articleEntity.findOne(aid);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    await this.articleEntity.update(article.aid, {
      state: 'delete',
    });
    return '删除成功';
  }
}
