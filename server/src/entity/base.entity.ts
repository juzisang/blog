import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class BaseEntity {
  @CreateDateColumn({ comment: '创建时间', select: false })
  ctime: number

  @UpdateDateColumn({ comment: '修改时间', select: false })
  utime: number
}
