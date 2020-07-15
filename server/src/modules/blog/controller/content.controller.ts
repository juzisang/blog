import { Controller, Get, Query, Body, Post, Put } from "@nestjs/common";
import { ContentService } from "../service/content.service";
import { ContentSaveDto, ContentUpdateDto } from "../dto/content.dto";
import { Auth } from "@app/common/auth.decorator";

@Controller('content')
export class ContentController {

  constructor(
    private readonly contentService: ContentService
  ) { }

  @Get()
  getAllList(@Query('page') page = 1, @Query('limit') limit = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.contentService.getList({
      page,
      limit
    });
  }

  @Auth()
  @Post()
  save(@Body() dto: ContentSaveDto) {
    return this.contentService.save(dto)
  }

  @Auth()
  @Put()
  update(@Body() dto: ContentUpdateDto) {
    return this.contentService.update(dto)
  }

}
