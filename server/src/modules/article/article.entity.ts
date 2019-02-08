import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('article')
export class ArticleEntity {
  /**
   * 文章id
   */
  @PrimaryGeneratedColumn({ comment: '文章id' })
  aid: number;

  /**
   * 所属用户
   */
  @Column({ comment: '用户id' })
  uid: number;

  /**
   * 文章标题
   */
  @Column({ comment: '文章标题' })
  title: string;

  /**
   * 描述
   */
  @Column({ type: 'text', comment: '文章描述' })
  description: string;

  /**
   * 文章关键字
   */
  @Column({ comment: '文章关键字' })
  keywords: string;

  /**
   * 文章内容
   */
  @Column({ type: 'text', comment: '文章内容', select: false })
  content: string;

  /**
   * 缩略图
   */
  @Column({ comment: '文章缩略图' })
  thumb: string;

  /**
   * 文章状态
   */
  @Column({ type: 'enum', enum: ['online', 'draft', 'delete'], comment: '文章状态' })
  state: 'online' | 'draft' | 'delete';

  /**
   * 创建时间
   */
  @CreateDateColumn({ comment: '创建时间' })
  create_time: Date;

  /**
   * 修改时间
   */
  @UpdateDateColumn({ comment: '修改时间' })
  update_time: Date;
}
