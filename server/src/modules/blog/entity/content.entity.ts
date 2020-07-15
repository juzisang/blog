import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToMany } from 'typeorm'
import { CategoryEntity } from './category.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from '@app/modules/user/user.entity';

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

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

  @OneToOne(type => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(type => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @ManyToMany(type => TagEntity)
  tags: TagEntity[]

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}