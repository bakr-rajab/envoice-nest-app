import { JwtUser } from './../../guards/jwt.strategy';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../../dtos/role.dto';
import { UserRole } from '../../enums/userRole.enum';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly repo: Repository<Role>,
    ) {
    }

    async onModuleInit() {
        const adminsCount = await this.repo.count({ where: { name: UserRole.SUPERADMIN }, loadEagerRelations: false })
        if (adminsCount === 0) {
            const newRole: Role = {
                name: UserRole.SUPERADMIN,
            }

            this.repo.save(newRole)
        }
    }

    async create(role: CreateRoleDto) {
        return await this.repo.save(role)
    }

    async findAll(user: JwtUser) {
        // if (user.role === UserRole.SUPERADMIN)
        return await this.repo.find();
        // return await this.repo.findBy({ name: UserRole.USER })
    }

    getDefault() {
        return this.repo.findOneBy({ name: UserRole.SUPERADMIN })
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id: id })
    }

    async update(id: number, role: UpdateRoleDto) {
        return await this.repo.update(id, role);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
