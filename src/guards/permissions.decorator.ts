import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';

export const Permissions = (...args: string[]) => {
    return applyDecorators(
    SetMetadata('permissions', args),
    UseGuards(PermissionsGuard),
  );

};

