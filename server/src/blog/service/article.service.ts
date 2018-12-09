import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from '../dto/article.dto';
import { MetasEntity } from '../entity/metas.entity';
import { RelationshipsEntity } from '../entity/relationships.entity';
import { UserEntity } from '../entity/user.entity';
import { UserService } from './user.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntity: Repository<ArticleEntity>,
    @InjectRepository(MetasEntity)
    private readonly metasEntity: Repository<MetasEntity>,
    @InjectRepository(RelationshipsEntity)
    private readonly relationshipsEntity: Repository<RelationshipsEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly userService: UserService,
  ) {}

  async createMetas(aid: number, dto: ArticleDto) {
    // 添加Tags
    if (dto.tags) {
      const tags = await this.metasEntity.findByIds([...dto.tags]);
      await this.relationshipsEntity.save(
        tags.map(tag =>
          this.relationshipsEntity.create({
            mid: tag.mid,
            aid,
          }),
        ),
      );
    }
    // 添加分类
    if (dto.category) {
      const category = await this.metasEntity.findOne(dto.category);
      await this.relationshipsEntity.save(
        this.relationshipsEntity.create({
          mid: category.mid,
          aid,
        }),
      );
    }
  }

  async createArticle(uid: number, dto: ArticleDto) {
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

  async updateArticle(aid: number, dto: ArticleDto) {
    const article = await this.articleEntity.findOne(aid);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    // 删除关联tag，分类
    await this.relationshipsEntity
      .createQueryBuilder()
      .delete()
      .from(RelationshipsEntity)
      .where('aid = :aid', { aid })
      .execute();
    // 重新生成
    await this.createMetas(aid, dto);
    return await this.articleEntity.update(article, dto);
  }

  async findList() {
    const user = await this.userService.findRoot();
    const articles = await this.articleEntity
      .createQueryBuilder('article')
      .where('article.uid = :uid', { uid: user.uid })
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
      .getMany();

    return articles.map((item: any) => {
      item.tags = item.metas.filter(meta => meta.type === 'tag');
      const category = item.metas.filter(meta => meta.type === 'category');
      item.category = category.length > 0 ? category[0] : null;
      delete item.metas;
      return item;
    });
  }
}
