import { OptionDto } from '@app/app.dto'
import { OptionsService } from '@app/service/options.service'
import { Auth } from '@app/util/auth.decorator'
import { Controller, Post, Body, Get } from '@nestjs/common'

@Controller('options')
export class OptionsController {
  constructor (private readonly optionsService: OptionsService) { }

  @Auth()
  @Post()
  save (@Body() options: OptionDto[]) {
    return this.optionsService.save(options)
  }

  @Auth()
  @Get()
  getAll () {
    return this.optionsService.getAll()
  }

}
