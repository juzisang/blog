import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { ArticleEntity } from './article.entity'
import { BaseEntity } from './base.entity'

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: '名字' })
  name: string

  @Column({ comment: '别名' })
  alias: string

  @Column({ comment: '描述' })
  description: string

  @OneToMany(
    () => ArticleEntity,
    article => article.category,
  )
  articles: ArticleEntity[]
}
