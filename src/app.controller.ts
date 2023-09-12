import { UseGuards } from '@nestjs/common/decorators';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// @UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
}

