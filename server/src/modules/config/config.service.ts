import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from './config.entity';
import { ConfigDto } from './config.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ConfigEntity)
    private readonly configEntity: Repository<ConfigEntity>,
  ) {}

  async updateConfig(dto: ConfigDto) {
    const configs = await this.configEntity.find();
    if (configs.length > 0) {
      return this.configEntity.save({
        ...configs[0],
        ...dto,
      });
    }
    return this.configEntity.save(dto);
  }

  getConfig() {
    return this.configEntity.findOne();
  }
}
