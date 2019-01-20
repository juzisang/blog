import { PrimaryColumn, Entity } from 'typeorm';

@Entity('relationships')
export class RelationshipsEntity {
  /**
   * 文章id
   */
  @PrimaryColumn({ comment: '文章id' })
  aid: number;

  /**
   * 项目类型id
   */
  @PrimaryColumn({ comment: '分类id' })
  mid: number;
}
