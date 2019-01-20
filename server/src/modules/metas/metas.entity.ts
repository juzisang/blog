import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('metas')
export class MetasEntity {
  /**
   * 类型ID
   */
  @PrimaryGeneratedColumn({ comment: '类型id' })
  mid: number;

  /**
   * 类型名字
   */
  @Column({ comment: '名字' })
  name: string;

  /**
   * 类型别名
   */
  @Column({ comment: '别名' })
  slug: string;

  /**
   * 描述
   */
  @Column({ nullable: true, comment: '描述' })
  description: string;

  /**
   * 类型
   */
  @Column({ type: 'enum', enum: ['tag', 'category'], comment: '类型' })
  type: string;

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
