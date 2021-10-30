import { CommentDto, PaginationDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { CommentEntity } from '@app/entity/comment.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as gravatar from 'gravatar'

@Injectable()
export class CommentService {
  constructor(@InjectRepository(CommentEntity) private readonly commentEntity: Repository<CommentEntity>, @InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>) {}

  async add(dto: CommentDto) {
    const article = await this.articleEntity.findOne(dto.articleId)
    await this.commentEntity.create({
      article: article,
      ...dto,
    })
  }

  async getList(id: number, { page, pageSize }: PaginationDto) {
    page = parseInt((page || 1).toString())
    pageSize = parseInt((pageSize || 10).toString())
    const article = this.articleEntity.create({ id })
    const [list, count] = await this.commentEntity.findAndCount({ where: { article }, skip: (page - 1) * pageSize, take: pageSize })
    return { list: list.map(item => ({ ...item, avatar: gravatar.url(item.mail) })), page, pageSize, count }
  }
}
