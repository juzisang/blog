import { PrimaryColumn, Entity } from 'typeorm';

@Entity('relationships')
export class RelationshipsEntity {
  @PrimaryColumn({ comment: '文章id' })
  aid: number;

  @PrimaryColumn({ comment: '分类id' })
  mid: number;
}
