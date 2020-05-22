import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: '用户ID' })
  uid: number;

  @Column({ comment: '类型', type: 'enum', enum: ['page', 'article'] })
  type: 'page' | 'article'

  @Column({
    comment: '文章状态',
    type: 'enum',
    enum: ['online', 'draft', 'delete'],
  })
  state: 'online' | 'draft' | 'delete';

  @Column({ comment: '阅读数' })
  views: number

  @Column({ comment: '额外字段', nullable: true })
  extra: string;

  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '文章缩略图' })
  thumb: string;

  @Column({ comment: '文章描述' })
  description: string;

  @Column({ comment: '内容', type: 'text' })
  content: string

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}