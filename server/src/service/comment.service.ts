import { CommentDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { CommentEntity } from '@app/entity/comment.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
}
