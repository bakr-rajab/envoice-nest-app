
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Role } from "../entities/role.entity";

export class CreatePermissionDto {
    @ApiProperty()
    url: string

    @ApiProperty()
    canInsert: boolean;

    @ApiProperty()
    canView: boolean;

    @ApiProperty()
    canUpdate: boolean;

    @ApiProperty()
    canDelete: boolean;

    @ApiProperty({ type: () => Role.call })
    role: Role;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) { }
