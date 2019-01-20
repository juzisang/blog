import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OptionEntity } from './option.entity';
import { OptionDto } from './option.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionEntity: Repository<OptionEntity>,
    private readonly userService: UserService,
  ) {}

  async saveOption(option: OptionDto) {
    const { uid } = await this.userService.findRoot();
    const { siteEmail, siteUrl, subTitle } = option;
    return this.optionEntity.save(
      this.optionEntity.create({
        ...option,
        site_email: siteEmail,
        site_url: siteUrl,
        sub_title: subTitle,
        uid,
      }),
    );
  }

  async updateOption(option: OptionDto) {
    const { uid } = await this.userService.findRoot();
    const { siteEmail, siteUrl, subTitle } = option;
    await this.optionEntity.update(uid, {
      ...option,
      site_email: siteEmail,
      site_url: siteUrl,
      sub_title: subTitle,
    });
    return '修改成功';
  }

  async findOption() {
    const { uid } = await this.userService.findRoot();
    return this.optionEntity.findOne({ uid });
  }
}
