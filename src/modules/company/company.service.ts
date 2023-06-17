import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from '../../dtos/company.dto';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(Company) private readonly repo: Repository<Company>) { }


    async create(body: CreateCompanyDto) {

        const newComp: Company = {
            name: body.name,
            certificate: body.certificate,
            activity: { id: +body.activity },
        }
        let company = await this.repo.save(newComp)
        return this.repo.findOneBy({ id: company.id })
    }

    async findAll() {
        let companies = await this.repo.find();
        return companies
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id: id });
    }

    update(id: number, comp: UpdateCompanyDto) {
        return this.repo.update(id, comp);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}
