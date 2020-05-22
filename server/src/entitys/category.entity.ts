import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: '父分类id' })
  pid: number;

  @Column({ comment: '标签名' })
  name: string;

  @Column({ comment: '别名' })
  alias: string;

  @Column({ comment: '描述', nullable: true })
  description: string;

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}