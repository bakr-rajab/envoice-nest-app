import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../entities/permission.entity';
import { CreatePermissionDto } from '../../dtos/permission.dto';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission) private readonly repo: Repository<Permission>,
    ) {
    }

    // async onModuleInit() {
    // const adminsCount = await this.repo.count({ where: { url: "superAdmin" }, loadEagerRelations: false })
    // if (adminsCount === 0) {
    //     const newAdmin: User = {
    //         name: 'superAdmin',
    //     }
    //     this.repo.save(newAdmin)
    // }
    // }

    create(body: CreatePermissionDto) {
        
        return this.repo.save(body)
    }

    async findAll() {
        return await this.repo.find();
    }

    async findOne(id: number) {
        return await this.repo.findOneBy({ id: id });
    }

    async update(id: number, updateUserDto: any) {
        return await this.repo.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.repo.delete(id);
    }
}
