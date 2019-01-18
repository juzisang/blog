import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('option')
export class OptionEntity {
  /**
   * key
   */
  @PrimaryColumn()
  name: string;

  /**
   * value
   */
  @Column()
  value: string;

  /**
   * 用户
   */
  @PrimaryColumn()
  uid: number;
}
