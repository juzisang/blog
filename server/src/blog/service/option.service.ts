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

  private toObject(optionArray: Array<any>) {
    const option = {};
    optionArray.forEach(item => (option[item.name] = item.value));
    if (Object.keys(option).length === 0) {
      return null;
    }
    return option;
  }

  async addOption(uid: number, option: OptionDto) {
    const options = Object.keys(option).map(key =>
      this.optionEntity.create({ name: key, value: option[key], uid }),
    );
    await this.optionEntity.save(options);
    return option;
  }

  async findOption(uid: number) {
    const optionArray = await this.optionEntity.find({
      where: { uid },
    });
    return this.toObject(optionArray);
  }

  async updateOption(uid: number, option: OptionDto) {
    // 删除所有配置
    await this.optionEntity.delete({ uid });
    // 添加
    await this.addOption(uid, option);
    return option;
  }
}
