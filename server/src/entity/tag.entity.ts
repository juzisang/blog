import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('tag')
export class MetaEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: '名字' })
  name: string

  @Column({ comment: '别名' })
  alias: string

  @Column({ comment: '描述' })
  description: string
}
