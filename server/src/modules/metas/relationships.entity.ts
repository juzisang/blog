import { PrimaryColumn, Entity } from 'typeorm';

@Entity('relationships')
export class RelationshipsEntity {
  /**
   * 文章id
   */
  @PrimaryColumn()
  aid: number;

  /**
   * 项目类型id
   */
  @PrimaryColumn()
  mid: number;
}
