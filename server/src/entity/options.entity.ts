import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('options')
export class OptionsEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: 'key', unique: true })
  key: string;

  @Column({ comment: '别名' })
  alias: string;

  @Column({ comment: 'value', nullable: true })
  value: string;

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}
