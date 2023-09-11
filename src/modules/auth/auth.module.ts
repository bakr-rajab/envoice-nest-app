import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../../guards/jwt.strategy';
import { LicenseModule } from '../license/license.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.TOKEN_SECRET,
      signOptions: { algorithm: 'HS256', expiresIn: '1h' },

    }),
    // import modules
    UserModule,
    LicenseModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,JwtService],
  exports: [AuthService, JwtStrategy,JwtService],
})
export class AuthModule { }
