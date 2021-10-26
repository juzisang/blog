import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from './base.entity'

@Entity('options')
export class OptionsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number

  @Column({ comment: 'key', unique: true })
  key: string

  @Column({ comment: '别名' })
  alias: string

  @Column({ comment: 'value', nullable: true })
  value: string
}
