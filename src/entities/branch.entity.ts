import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { OBaseEntity } from './OBaseEntity';
import { Address } from './address.entity';
import { User } from './user.entity';
import { Client } from './client.entity';
import { Company } from './company.entity';

@Entity()
export class Branch extends OBaseEntity {
    @Column({})
    name_en?: string;

    @Column({})
    name_ar?: string;

    @Column({ nullable: true })
    code?: string;

    @Column({ default: 0 })
    invoiceSerial?: number;

    @OneToOne(() => Address, { cascade: true, eager: true })
    @JoinColumn()
    address?: Address;

    @ApiPropertyOptional({ type: () => User })
    @OneToMany(() => User, r => r.branch, { cascade: ['soft-remove'] })
    users?: User[];

    // @ApiPropertyOptional({ type: () => Client })
    // @ManyToOne(() => Client, u => u.branch)
    // clients?: Client[];

    @ApiPropertyOptional({ type: () => Company })
    @ManyToOne(() => Company, u => u.branch)
    company?: Company;
}
