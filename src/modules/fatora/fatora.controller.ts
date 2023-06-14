import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FatoraService } from './fatora.service';
import { CreateFatoraDto } from './dto/create-fatora.dto';
import { UpdateFatoraDto } from './dto/update-fatora.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('fatora')
@ApiTags('fatora')
export class FatoraController {
  constructor(private readonly fatoraService: FatoraService) { }

  @Post()
  create(@Body() createFatoraDto: CreateFatoraDto) {
    return this.fatoraService.create(createFatoraDto);
  }

  @Get()
  findAll() {
    return this.fatoraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fatoraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFatoraDto: UpdateFatoraDto) {
    return this.fatoraService.update(+id, updateFatoraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fatoraService.remove(+id);
  }
}
