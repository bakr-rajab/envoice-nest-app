import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from '../../entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from '../../entities/permission.entity';
import { User } from 'src/entities/user.entity';
import { CompanyService } from '../company/company.service';
import { Company } from 'src/entities/company.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission,User,Company])
  ,
  // AuthModule
],
  controllers: [RoleController],
  providers: [RoleService,CompanyService,AuthService,JwtService,UserService],
  exports: [RoleService]
})
export class RoleModule { }
