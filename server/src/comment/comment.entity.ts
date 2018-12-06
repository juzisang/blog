import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from '../article/article.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 父评论id
   */
  @Column()
  pid: number;

  /**
   * 评论者名字
   */
  @Column()
  author_name: string;

  /**
   * 评论者邮箱
   */
  @Column()
  author_email: string;

  /**
   * 评论者地址
   */
  @Column()
  author_site: string;

  /**
   * 评论内容
   */
  @Column()
  content: string;

  /**
   * 是否顶置
   */
  @Column()
  is_top: boolean;

  /**
   * ip地址
   */
  @Column()
  ip: string;

  /**
   * 用户UA
   */
  @Column()
  agent: string;

  /**
   * 状态
   */
  @Column({ type: 'enum', enum: ['online', 'delete'] })
  state: 'online' | 'delete';

  /**
   * 关联文章
   */
  @ManyToOne(type => Article, article => article.comments)
  article: Article;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
