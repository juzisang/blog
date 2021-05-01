import { OptionDto } from '@app/app.dto'
import { OptionsEntity } from '@app/entity/options.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In } from 'typeorm'

@Injectable()
export class OptionsService {
  constructor(@InjectRepository(OptionsEntity) private readonly optionsEntity: Repository<OptionsEntity>) {}

  async save(options: OptionDto[]) {
    this.optionsEntity.find({})
    const existsOptions = await this.optionsEntity.find({ key: In(options.map(v => v.key)) })
    const updateOptions = options.map((v) => ({ ...existsOptions.find(item => item.key === v.key), ...v }))
    await this.optionsEntity.save(updateOptions)
  }

  getAll() {
    return this.optionsEntity.find()
  }
}
