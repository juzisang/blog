import { MetaDto } from '@app/app.dto'
import { MetaEntity } from '@app/entity/meta.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MetaService {
  constructor(@InjectRepository(MetaEntity) private readonly metaService: Repository<MetaEntity>) {}

  getList(type: 'tag' | 'category') {
    return this.metaService.find({ type })
  }

  async save(dto: MetaDto, type: 'tag' | 'category') {
    const meta = await this.metaService.findOne({ name: dto.name, type })
    await this.metaService.save(this.metaService.create({ ...meta, ...dto, type }))
  }
}
