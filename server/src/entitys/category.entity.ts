import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Tree, TreeChildren } from 'typeorm'

@Entity('category')
@Tree('materialized-path')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ comment: '父分类id', nullable: true })
  pid: number;

  @Column({ comment: '标签名' })
  name: string;

  @Column({ comment: '别名' })
  alias: string;

  @Column({ comment: '描述', nullable: true })
  description: string;

  @TreeChildren()
  children: CategoryEntity[];

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date;

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date;
}