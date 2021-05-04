import { ArticleDto } from '@app/app.dto'
import { ArticleEntity } from '@app/entity/article.entity'
import { ArticleMetaRelationEntity } from '@app/entity/article_meta_relation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private readonly articleEntity: Repository<ArticleEntity>, @InjectRepository(ArticleMetaRelationEntity) private readonly articleMetaRelationEntity: Repository<ArticleMetaRelationEntity>) {}

  getArticle(id: number) {
    return this.articleEntity.findOneOrFail({ id })
  }

  async saveArticle(dto: ArticleDto) {
    const article = await this.articleEntity.findOne({ title: dto.title })
    if (article) {
      // this.articleMetaRelationEntity.find({meta_id:})
    }

    await this.articleEntity.save(
      this.articleEntity.create({
        ...article,
        ...dto,
      }),
    )
  }
}
