import { OptionDto } from '@app/app.dto'
import { OptionsService } from '@app/service/options.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get, Patch } from '@nestjs/common'

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Auth()
  @Post()
  save(@Body() options: OptionDto[]) {
    return this.optionsService.save(options)
  }

  @Auth()
  @Patch()
  update(@Body() options: OptionDto[]) {
    return Promise.reject()
  }

  @Auth()
  @Get()
  getAll() {
    return this.optionsService.getAll()
  }
}
