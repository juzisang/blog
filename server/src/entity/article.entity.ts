import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Index()
  @Column({ comment: '标题' })
  title: string

  @Column({ comment: '描述' })
  description: string

  @Column({ comment: '内容', type: 'text' })
  content: string

  @Column({ comment: '封面' })
  thumb: string

  @Column({ comment: '用户ID' })
  user_id: string

  @Column({ comment: '阅读数' })
  views: number

  @Column({ comment: '状态', type: 'enum', enum: ['online', 'draft', 'delete'] })
  state: 'online' | 'draft' | 'delete'

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date
}
