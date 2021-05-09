import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm'
import { BaseEntity } from './base.entity'
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

  @Column({ comment: '内容Html', type: 'text', select: false })
  contentHtml: string

  @Column({ comment: '封面' })
  thumb: string

  @Column({ comment: '阅读数' })
  views: number

  @Column({ comment: '状态', type: 'enum', enum: ['online', 'draft', 'delete'], select: false })
  state: 'online' | 'draft' | 'delete'

  @ManyToOne(type => UserEntity, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
