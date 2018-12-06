import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Tag } from '../tag/tag.entity';
import { Comment } from '../comment/comment.entity';

@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 文章标题
   */
  @Column({ nullable: false })
  title: string;

  /**
   * 搜索关键字
   */
  @Column()
  keywords: string;

  /**
   * 描述
   */
  @Column({ type: 'text' })
  description: string;

  /**
   * 文章内容
   */
  @Column({ type: 'text', nullable: false })
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

  /**
   * 分类
   */
  @OneToOne(type => Category)
  @JoinColumn()
  category: Category;

  /**
   * 标签
   */
  @OneToMany(type => Tag, tag => tag.article)
  @JoinColumn()
  tags: Tag[];

  /**
   * 评论列表
   */
  @OneToMany(type => Comment, comment => comment.article)
  @JoinColumn()
  comments: Comment[];

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
