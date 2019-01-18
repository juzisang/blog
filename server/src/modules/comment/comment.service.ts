import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './comment.entity';
import { PaginationDto } from '../article/pagination.dto';
import { ArticleEntity } from '../article/article.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentEntity: Repository<CommentEntity>,
    @InjectRepository(ArticleEntity)
    private readonly articleEntity: Repository<ArticleEntity>,
  ) {}

  async findList(aid: number, dto: PaginationDto) {
    const article = await this.articleEntity.findOne(aid);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }
    const [list, count] = await this.commentEntity
      .createQueryBuilder('comment')
      .where({ aid })
      .skip((dto.index - 1) * dto.size)
      .take(dto.size)
      .getManyAndCount();
    return {
      list,
      pagination: {
        size: parseInt(dto.size as any, 0),
        index: parseInt(dto.index as any, 0),
        count,
      },
    };
  }

  async create(aid: number, comment: any) {
    const article = await this.articleEntity.findOne(aid);
    if (!article) {
      throw new BadRequestException('文章不存在');
    }

    if (comment.parent) {
      const parent = await this.commentEntity.findOne(comment.parent);
      if (!parent) {
        throw new BadRequestException('父评论不存在');
      }
    }

    const commentObj = this.commentEntity.create({
      aid,
      ...comment,
    });
    return this.commentEntity.save(commentObj);
  }

  async update(cid: number, state) {
    return this.commentEntity.update(cid, { state });
  }
}
