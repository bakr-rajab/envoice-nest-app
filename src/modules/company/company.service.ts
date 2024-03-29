import { UserRole } from './../../enums/userRole.enum';
import { JwtUser } from './../../guards/jwt.strategy';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto, UpdateCompanyDto } from '../../dtos/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly repo: Repository<Company>,
  ) {}

  async onModuleInit() {
    const company = await this.repo.count({
      where: { taxNumber: '20150012' },
      loadEagerRelations: false,
    });
    console.log('companys', company);

    if (company === 0) {
      const newC: Company = {
        name: 'Default Company',
        taxNumber: '20150012',
        certificate: 'EgyTrust',
      };

      await this.repo.save(newC);
    }
  }

  async getDefaultCompany(): Promise<Company> {
    const company = await this.repo.findOneBy({ taxNumber: '20150012' });
    return company;
  }

  async create(body: CreateCompanyDto) {
    console.log('====================================');
    console.log(body);
    console.log('====================================');
    const newComp: Company = {
      name: body.name,
      taxNumber: body.taxNumber,
      endDate: new Date(body.endDate),
      pin: +body.pin,
      dllLibPath: body.dllLibPath,
      certificate: body.certificate,
      clientId: body.clientId,
      clientSecret1: body.clientSecret1,
      clientSecret2: body.clientSecret2,
      activity: { id: +body.activity },
    };

    const company = await this.repo.save(newComp);
    console.log('====================================');
    console.log(company);
    console.log('====================================');
    return this.repo.findOneBy({ id: company.id });
  }

  async findAll(user: JwtUser) {
    return await this.repo.find();
    // if (user.role === UserRole.SUPERADMIN)
    //     return await this.repo.find();
    // return await this.repo.createQueryBuilder("c")
    //     .leftJoin("c.user", "user")
    //     .leftJoinAndSelect("c.activity", "activities")
    //     .where("user.id = :id", { id: user.id })
    //     .getMany()
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  update(id: number, comp: UpdateCompanyDto) {
    console.log({ comp });

    return this.repo.update(id, comp);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
