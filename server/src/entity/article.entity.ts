import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { BaseEntity } from './base.entity'
import { CategoryEntity } from './category.entity'
import { CommentEntity } from './comment.entity'
import { TagEntity } from './tag.entity'
import { UserEntity } from './user.entity'

@Entity('article')
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Index()
  @Column({ comment: '标题' })
  title: string

  @Column({ comment: '描述' })
  description: string

  @Column({ comment: '内容', type: 'text', select: false })
  content: string

  @Column({ comment: '封面' })
  thumb: string

  @Column({ comment: '阅读数', default: 0 })
  viewNumber: number

  @Column({ comment: '点赞数', default: 0 })
  giveNumber: number

  @Column({ comment: '状态', type: 'enum', enum: ['online', 'draft', 'delete'], select: false })
  state: 'online' | 'draft' | 'delete'

  @ManyToOne(
    () => UserEntity,
    user => user.articles,
  )
  user: CategoryEntity

  @ManyToOne(
    () => CategoryEntity,
    category => category.articles,
  )
  category: CategoryEntity

  @ManyToMany(
    () => TagEntity,
    tag => tag.articles,
  )
  @JoinTable()
  tags: TagEntity[]

  @OneToMany(
    () => CommentEntity,
    comment => comment.article,
  )
  comments: CommentEntity[]
}
