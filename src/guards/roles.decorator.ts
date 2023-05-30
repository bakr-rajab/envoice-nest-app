import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { UserRole } from '../enums/userRole.enum';

export function Role(role: UserRole[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    SetMetadata('roles', role),
    UseGuards(RolesGuard),
  );
}
// applyDecorators();
