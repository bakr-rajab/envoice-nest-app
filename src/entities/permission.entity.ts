import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { OverrideUtils } from '../shared/override-utility';
import { OBaseEntity } from './OBaseEntity';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity()
export class Permission extends OBaseEntity {
    @ApiProperty()
    @Column({})
    url?: string;

    @ApiProperty()
    @Column({})
    canInsert: boolean;

    @ApiProperty()
    @Column({
        type: Boolean,
        nullable: false,
    })
    canView: boolean;

    @ApiProperty()
    @Column({})
    canUpdate: boolean;

    @ApiProperty()
    @Column({})
    canDelete: boolean;

    //@ApiPropertyOptional({ type: () => Role })
    @ManyToOne(() => Role, p => p.permissions)
    role: Role;
}
