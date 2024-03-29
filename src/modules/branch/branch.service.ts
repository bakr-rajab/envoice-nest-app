import { Address } from './../../entities/address.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from '../../entities/branch.entity';
import { Repository } from 'typeorm';
import { CreateBranchDto, UpdateBranchDto } from '../../dtos/branch.dto';
import { JwtUser } from '../../guards/jwt.strategy';
import { UserService } from '../user/user.service';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch) private readonly repo: Repository<Branch>,
    private userService: UserService,
  ) {}

  async create(branch: CreateBranchDto, user: JwtUser) {
    // const userDb = await this.userService.findOne(+user.id)
    console.log(branch);

    // return userDb;

    // branch.address.country = { id: +branch.address.country };

    const address: Address = branch.address;

    const newbranch: Branch = {
      name_ar: branch.name_ar,
      name_en: branch.name_en,
      code: branch.code,
      invoiceSerial: branch.invoiceSerial,
      address: address,
      company: { id: +branch.company },
    };

    return await this.repo.save(newbranch);
  }

  async findAll(user: JwtUser) {
    const branches = await this.repo
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.company', 'company')
      .leftJoinAndSelect('b.address', 'address')
      .leftJoinAndSelect('address.country', 'coutry')
      // .where('user.id = :id', { 'id': user.id })
      .getMany();
    console.log(branches);

    return branches;
  }

  async findOne(id: number) {
    return await this.repo.findOneBy({ id: id });
  }

  async update(id: number, branch: UpdateBranchDto) {
    return await this.repo.update(id, branch);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
