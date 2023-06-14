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
    @Column({})
    name?: string;

    @ApiPropertyOptional({ type: () => Role })
    @OneToMany(() => Role, p => p.permissions)
    role: Role;
}