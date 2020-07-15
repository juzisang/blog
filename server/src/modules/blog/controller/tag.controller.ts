import { Controller, Body, Post, Get, Put } from "@nestjs/common";
import { TagService } from "../service/tag.service";
import { TagSaveDto, TagUpdateDto } from "../dto/tag.dto";
import { Auth } from "@app/common/auth.decorator";


@Controller('tag')
export class TagController {

  constructor(
    private readonly tagService: TagService
  ) { }

  @Get('/list')
  getAllList() {
    return this.tagService.getAllList()
  }

  @Auth()
  @Post()
  save(@Body() dto: TagSaveDto) {
    return this.tagService.save(dto)
  }

  @Auth()
  @Put()
  update(@Body() dto: TagUpdateDto) {
    return this.tagService.update(dto)
  }

}
