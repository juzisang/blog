import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('meta')
export class MetaEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: '名字' })
  name: string

  @Column({ comment: '别名' })
  alias: string

  @Column({ comment: '描述' })
  description: string

  @Column({ comment: '类目', type: 'enum', enum: ['tag', 'category'], select: false })
  type: 'tag' | 'category'

  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: Date

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: Date
}
