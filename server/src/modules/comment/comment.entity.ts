import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  TreeParent,
  TreeChildren,
  TreeLevelColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  cid: number;

  /**
   * 关联文章
   */
  @Column()
  aid: number;

  /**
   * 父评论
   */
  @Column()
  parent: number;

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

  @CreateDateColumn()
  create_time: Date;

  @UpdateDateColumn()
  update_time: Date;
}
