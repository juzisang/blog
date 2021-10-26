import { Entity, Column, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent, ManyToOne } from 'typeorm'
import { ArticleEntity } from './article.entity'
import { BaseEntity } from './base.entity'

@Entity('comment')
@Tree('closure-table')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column()
  nickname: string

  @Column()
  mail: string

  @Column({ nullable: true })
  siteUrl: string

  @Column({ type: 'text' })
  content: string

  @TreeChildren()
  children: CommentEntity[]

  @TreeParent()
  parent: CommentEntity

  @ManyToOne(
    () => ArticleEntity,
    article => article.comments,
  )
  article: ArticleEntity
}
