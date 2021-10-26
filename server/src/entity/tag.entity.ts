import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { ArticleEntity } from './article.entity'
import { BaseEntity } from './base.entity'

@Entity('tag')
export class TagEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: '名字' })
  name: string

  @Column({ comment: '别名' })
  alias: string

  @Column({ comment: '描述' })
  description: string

  @ManyToMany(
    () => ArticleEntity,
    article => article.tags,
  )
  articles: ArticleEntity[]
}
