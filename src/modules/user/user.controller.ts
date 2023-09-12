import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { Role } from 'src/guards/roles.decorator';
import { Permissions } from 'src/guards/permissions.decorator';

@Controller('users')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Permissions("read:users")
  @Get("all")
  findAll(@Req() req: any) {
    
    console.log("get all users", req.user);
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
