import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from '../dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleEntity: Repository<ArticleEntity>,
  ) {}

  async createArticle(dto: ArticleDto) {
    const article = this.articleEntity.create({
      title: dto.title,
      description: dto.description,
      keywords: dto.keywords,
      content: dto.content,
      comments: [],
      thumb: dto.thumb,
      state: dto.state,
    });
    const newArticle = await this.articleEntity.save(article);

    await this.articleEntity
      .createQueryBuilder()
      .relation(ArticleEntity, 'tags')
      .of(newArticle)
      .add(dto.tags);

    await this.articleEntity
      .createQueryBuilder()
      .relation(ArticleEntity, 'category')
      .of(newArticle)
      .set(dto.category);

    return article;
  }
}
