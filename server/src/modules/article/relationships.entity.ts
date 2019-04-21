import { Entity, PrimaryColumn } from 'typeorm';

@Entity('relationships')
export class RelationshipsEntity {
  @PrimaryColumn({ comment: '文章id' })
  aid: number;

  @PrimaryColumn({ comment: '分类标签id' })
  mid: number;
}
