import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('article_meta_relation')
export class ArticleMetaRelationEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: '文章ID', name: 'article_id' })
  articleId: number

  @Column({ comment: '标签或分类ID', name: 'meta_id' })
  metaId: number
}
