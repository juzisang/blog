import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionEntity } from '../entity/option.entity';
import { Repository } from 'typeorm';
import { OptionDto } from '../dto/option.dto';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionEntity: Repository<OptionEntity>,
  ) {}

  createdOption(option: OptionDto) {}

  async findOneOption() {}

  async updateOption(option: OptionDto) {}
}
