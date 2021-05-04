import * as dayjs from 'dayjs'
import { CreateDateColumn, UpdateDateColumn, ValueTransformer } from 'typeorm'

class ReadDateFormat implements ValueTransformer {
  constructor(private readonly formatstr: string = 'YYYY-MM-DD') {}
  to(value: any) {
    return value
  }
  from(value: any) {
    return dayjs(value).format(this.formatstr)
  }
}

export class BaseEntity {
  @CreateDateColumn({ comment: '创建时间', transformer: new ReadDateFormat(), select: false })
  ctime: Date

  @UpdateDateColumn({ comment: '修改时间', transformer: new ReadDateFormat(), select: false })
  utime: Date
}
