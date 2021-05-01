import { MetaDto } from '@app/app.dto'
import { MetaEntity } from '@app/entity/meta.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class MetaService {
  constructor(@InjectRepository(MetaEntity) private readonly metaService: Repository<MetaEntity>) {}

  getMetas(type: 'tag' | 'category') {
    return this.metaService.find({ type })
  }

  async saveMeta(tagDto: MetaDto, type: 'tag' | 'category') {
    const meta = await this.metaService.findOne({ name: tagDto.name, type })
    return this.metaService.save(this.metaService.create({ ...meta, ...tagDto }))
  }
}
