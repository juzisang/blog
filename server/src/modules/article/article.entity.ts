import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  aid: number;

  /**
   * 所属用户
   */
  @Column()
  uid: number;

  /**
   * 文章标题
   */
  @Column()
  title: string;

  /**
   * 描述
   */
  @Column({ type: 'text' })
  description: string;

  /**
   * 文章内容
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * 缩略图
   */
  @Column({ default: '' })
  thumb: string;

  /**
   * 文章状态
   */
  @Column({ type: 'enum', enum: ['online', 'draft', 'delete'] })
  state: 'online' | 'draft' | 'delete';

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
