import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  TreeParent,
  TreeChildren,
  TreeLevelColumn,
} from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 子评论
   */
  @TreeChildren()
  children: CommentEntity[];

  /**
   * 父评论
   */
  @TreeParent()
  parent: CommentEntity;

  /**
   * 评论级别
   */
  @TreeLevelColumn()
  level: number;

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
  @Column({ nullable: true })
  author_site: string;

  /**
   * 评论内容
   */
  @Column()
  content: string;

  /**
   * 是否顶置
   */
  @Column({ default: false })
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
  @ManyToOne(type => ArticleEntity, article => article.comments)
  article: ArticleEntity;

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
