import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { RoleModule } from '../role/role.module';
import { Activities } from '../../entities/activity.entity';
import { StaticModule } from '../static/static.module';
import { CompanyModule } from '../company/company.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guards/jwt.strategy';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Activities]),
    RoleModule
    , StaticModule
    , CompanyModule
  ],
  controllers: [UserController],
  providers: [UserService,AuthService,JwtService],
  exports: [UserService]
})
export class UserModule { }
