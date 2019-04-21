import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn({ comment: '文章id' })
  id: number;

  @Column({ comment: '用户id' })
  uid: number;

  @Column({ comment: '文章标题' })
  title: string;

  @Column({ comment: '文章关键字' })
  keywords: string;

  @Column({ type: 'text', comment: '文章描述' })
  description: string;

  @Column({ type: 'text', comment: '文章内容', select: false })
  content: string;

  @Column({ comment: '文章缩略图' })
  thumb: string;

  @Column({
    type: 'enum',
    enum: ['online', 'draft', 'delete'],
    comment: '文章状态',
  })
  state: 'online' | 'draft' | 'delete';

  @CreateDateColumn({ comment: '创建时间' })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间' })
  utime: Date;
}
