import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('comment')
export class CommentEntity {
  /**
   * 评论id
   */
  @PrimaryGeneratedColumn({ comment: '评论id' })
  cid: number;

  /**
   * 关联文章
   */
  @Column({ comment: '所属文章id' })
  aid: number;

  /**
   * 父评论
   */
  @Column({ nullable: true, comment: '父评论id' })
  parent: number;

  /**
   * 评论者名字
   */
  @Column({ comment: '评论者名字' })
  author_name: string;

  /**
   * 评论者邮箱
   */
  @Column({ comment: '评论者邮箱' })
  author_email: string;

  /**
   * 评论者地址
   */
  @Column({ comment: '评论者站点' })
  author_site: string;

  /**
   * 评论内容
   */
  @Column({ comment: '评论内容' })
  content: string;

  /**
   * ip地址
   */
  @Column({ comment: '评论IP' })
  ip: string;

  /**
   * 用户UA
   */
  @Column({ comment: '设备信息' })
  agent: string;

  /**
   * 状态
   */
  @Column({ type: 'enum', enum: ['online', 'delete'], comment: '评论状态' })
  state: 'online' | 'delete';

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
