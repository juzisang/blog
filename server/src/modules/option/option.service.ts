import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionEntity } from './option.entity';
import { Repository } from 'typeorm';
import { OptionDto } from './dto/option.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionEntity: Repository<OptionEntity>,
  ) {}

  createdOption(option: OptionDto) {
    return this.optionEntity.create(option);
  }

  async findOneOption() {
    const options = await this.optionEntity.find();
    return options[0];
  }

  async updateOption(option: OptionDto) {
    const one = await this.findOneOption();
    return await this.optionEntity.merge(one, option);
  }
}
