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
import { CategoryEntity } from '../category/category.entity';
import { TagEntity } from '../tag/tag.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity('article')
export class ArticleEntity {
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
  @OneToOne(type => CategoryEntity)
  @JoinColumn()
  category: CategoryEntity;

  /**
   * 标签
   */
  @OneToMany(type => TagEntity, tag => tag.article)
  @JoinColumn()
  tags: TagEntity[];

  /**
   * 评论列表
   */
  @OneToMany(type => CommentEntity, comment => comment.article)
  @JoinColumn()
  comments: CommentEntity[];

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
