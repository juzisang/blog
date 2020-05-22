import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('content_relation')
export class ContentRelationEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: '文章id' })
  cid: number;

  @Column({ comment: '分类标签Id' })
  rid: number;

  @Column({ comment: '类型', type: 'enum', enum: ['tag', 'category'] })
  type: 'tag' | 'category';
}