import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('metas')
export class MetasEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: '名字' })
  name: string;

  @Column({ comment: '别名' })
  slug: string;

  @Column({ nullable: true, comment: '描述' })
  description: string;

  @Column({ type: 'enum', enum: ['tag', 'category'], comment: '类型'})
  type: string;

  @CreateDateColumn({ comment: '创建时间' })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间' })
  utime: Date;
}
