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
    const { uid } = await this.userService.getAdmin();
    const { siteEmail, siteUrl, subTitle } = option;
    await this.optionEntity.save(
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
    const { uid } = await this.userService.getAdmin();
    const { siteEmail, siteUrl, subTitle } = option;
    await this.optionEntity.update(uid, {
      ...option,
      site_email: siteEmail,
      site_url: siteUrl,
      sub_title: subTitle,
    });
  }

  async findOption() {
    const { uid } = await this.userService.getAdmin();
    return this.optionEntity.findOne({ uid });
  }
}
