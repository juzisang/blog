import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, ManyToMany } from 'typeorm'
import { CategoryEntity } from './category.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from '@app/modules/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('content')
export class ContentEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @ApiProperty({ description: '类型' })
  @Column({ comment: '类型', type: 'enum', enum: ['page', 'article'], select: false, default: 'article' })
  type: 'article' | 'page'

  @ApiProperty({ description: '状态' })
  @Column({ comment: '状态', type: 'enum', enum: ['online', 'draft', 'delete'] })
  state: 'online' | 'draft' | 'delete';

  @ApiProperty({ description: '阅读数' })
  @Column({ comment: '阅读数' })
  views: number

  @ApiProperty({ description: '额外字段' })
  @Column({ comment: '额外字段', nullable: true })
  extra: string;

  @ApiProperty({ description: '标题' })
  @Column({ comment: '标题' })
  title: string;

  @ApiProperty({ description: '缩略图' })
  @Column({ comment: '缩略图' })
  thumb: string;

  @ApiProperty({ description: '描述' })
  @Column({ comment: '描述' })
  description: string;

  @ApiProperty({ description: '内容' })
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