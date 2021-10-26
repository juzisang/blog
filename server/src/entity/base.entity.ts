import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp', comment: '创建时间', select: false })
  ctime: number

  @UpdateDateColumn({ type: 'timestamp', comment: '修改时间', select: false })
  utime: number
}
