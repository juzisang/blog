import { CreateDateColumn, UpdateDateColumn, ValueTransformer } from 'typeorm'
import * as dayjs from 'dayjs'

export class DateFormat implements ValueTransformer {
  constructor(private readonly formatstr: string = 'YYYY-MM-DD HH:mm:ss') {}
  to(value: any) {
    return value
  }
  from(value: any) {
    return dayjs(value).format(this.formatstr)
  }
}

export class BaseEntity {
  @CreateDateColumn({ comment: '创建时间', transformer: new DateFormat(), select: false })
  ctime: number

  @UpdateDateColumn({ comment: '修改时间', transformer: new DateFormat(), select: false })
  utime: number
}
