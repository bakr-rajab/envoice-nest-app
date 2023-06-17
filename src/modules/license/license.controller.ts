import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LicenseService } from './license.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateLicenseDto, UpdateLicenseDto } from '../../dtos/license.dto';


@ApiTags('license')
@Controller('license')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) { }

  @Post()
  create(@Body() createLicenseDto: CreateLicenseDto) {
    return this.licenseService.create(createLicenseDto);
  }

  @Get()
  findAll() {
    return this.licenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseDto: UpdateLicenseDto) {
    return this.licenseService.update(+id, updateLicenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenseService.remove(+id);
  }
}