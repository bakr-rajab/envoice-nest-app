import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StaticService } from './static.service';

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) { }

  @Post()
  create(@Body() createStaticDto: any) {
    return this.staticService.create(createStaticDto);
  }

  @Get()
  findAll() {
    return this.staticService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaticDto: any) {
    return this.staticService.update(+id, updateStaticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staticService.remove(+id);
  }
}
