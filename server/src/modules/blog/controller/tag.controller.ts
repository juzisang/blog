import { Controller, Body, Post, Get, Put, Param } from "@nestjs/common";
import { TagService } from "../service/tag.service";
import { TagSaveDto, TagUpdateDto } from "../dto/tag.dto";
import { Auth } from "@app/common/auth.decorator";
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiParam } from "@nestjs/swagger";
import { TagEntity } from "../entity/tag.entity";

@ApiTags('tag')
@Controller('tag')
export class TagController {

  constructor(
    private readonly tagService: TagService
  ) { }

  @ApiOkResponse({ type: [TagEntity], isArray: true, description: '标签列表' })
  @Get()
  list() {
    return this.tagService.getAllList()
  }

  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: TagEntity, description: '标签详情' })
  @Get(':id')
  one(@Param('id') id: string) {
    return
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: TagEntity, description: '保存标签' })
  @Auth()
  @Post()
  save(@Body() dto: TagSaveDto) {
    return this.tagService.save(dto)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ type: TagEntity, description: '更新标签' })
  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: TagUpdateDto) {
    return this.tagService.update(dto)
  }
}
