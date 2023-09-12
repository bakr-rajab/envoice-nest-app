import { JwtAuthGuard } from './../../guards/jwt.guard';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../dtos/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
 
  @Post('/login')
  userLogin(@Body() user: LoginDto) {
    return this.authService.Login(user);
  }
}
