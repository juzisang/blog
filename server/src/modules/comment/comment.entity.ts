import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn({ comment: '评论id' })
  id: number;

  @Column({ comment: '父评论', name: 'parent_id', nullable: true })
  parentId: number;

  @Column({ comment: '所属文章id' })
  aid: number;

  @Column({ comment: '评论者名字', name: 'author_name' })
  authorName: string;

  @Column({ comment: '评论者邮箱', name: 'author_email' })
  authorEmail: string;

  @Column({ comment: '评论者站点', name: 'author_site' })
  authorSite: string;

  @Column({ comment: '评论内容' })
  content: string;

  @Column({ comment: '评论IP' })
  ip: string;

  @Column({ comment: '设备信息' })
  agent: string;

  @CreateDateColumn({ comment: '创建时间' })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间' })
  utime: Date;
}
