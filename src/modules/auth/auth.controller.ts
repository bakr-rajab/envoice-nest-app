import { JwtAuthGuard } from './../../guards/jwt.guard';
import { Body, Controller, Get, Post, Req, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  //   @ApiTags('user')
  //   @Post('/user/login')
  //   userLogin(@Body() user: LoginDto, @I18n() i18n: I18nContext) {

  //     return this.authService.userLogin(user, i18n);
  //   }
  //   @ApiTags('user/admin')
  //   @Post('/user/register')

  //   userRegister(@Body() user: RegisterDto, @I18n() i18n: I18nContext) {
  //     return this.authService.userRegister(user, i18n);
  //   }
  //   //==============================================
  //   @ApiTags('driver')
  //   @Post('/driver/login')
  //   driverLogin(@Body() user: LoginDto, @I18n() i18n: I18nContext) {
  //     return this.authService.driverLogin(user, i18n);
  //   }

  //   @ApiTags('driver/admin')
  //   @Post('/driver/register')
  //   @Role([WinchRoles.admin, WinchRoles.dispatcher])
  //   driverRegister(@Body() driver: CreateDriverDto, @I18n() i18n: I18nContext) {
  //     return this.authService.driverRegister(driver, i18n);
  //   }
  //   //==============================================



}
