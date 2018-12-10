import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MetasDto } from '../dto/metas.dto';
import { MetasService } from '../service/metas.service';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Get('tags')
  findTags() {
    return this.metasService.findAll('tag');
  }

  @Get('categorys')
  findCategorys() {
    return this.metasService.findAll('category');
  }

  @Get(':type/:id')
  findOne(@Param('type') type, @Param('id') mid) {
    return this.metasService.findOne(type, { mid });
  }

  @UseGuards(AuthGuard())
  @Post(':type')
  create(@Param('type') type, @Body() dto: MetasDto) {
    return this.metasService.create(type, dto);
  }

  @UseGuards(AuthGuard())
  @Put(':type/:id')
  update(@Param('type') type, @Param('id') id: number, @Body() dto: MetasDto) {
    return this.metasService.update(type, dto);
  }

  @UseGuards(AuthGuard())
  @Delete(':type/:id')
  async delete(@Param('type') type, @Param('id') id: number) {
    return this.metasService.delete(type, id);
  }
}
