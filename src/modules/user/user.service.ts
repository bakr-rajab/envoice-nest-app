import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto, UpdateUserDto } from '../../dtos/user.dto';
import { RoleService } from '../role/role.service';
import { CompanyService } from '../company/company.service';
import { Role } from '../../entities/role.entity';
import { UserRole } from 'src/enums/userRole.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private readonly roleService: RoleService,
    private readonly compService: CompanyService,
  ) {}

  async onModuleInit() {
    const adminsCount = await this.repo.count({
      where: { email: 'admin@dev.com' },
      loadEagerRelations: false,
    });
    const role = await this.roleService.getDefault();
    const company = await this.compService.getDefaultCompany();

    if (adminsCount === 0) {
      let adminRole: Role;
      if (role) {
        adminRole = role;
      } else {
        adminRole = {
          name: UserRole.SUPERADMIN,
          permissions: [
            {
              url: 'AllEntities',
              canInsert: true,
              canUpdate: true,
              canView: true,
              canDelete: true,
            },
          ],
        } as Role;
      }

      const newAdmin: User = {
        name: 'المدير العام',
        email: 'admin@dev.com',
        password: '123456789',
        phone: '01111111111',
        role: role,
        company: company,
      };

      this.repo.save(newAdmin);
    }
  }


  async findUser(body: LoginDto): Promise<User | PromiseLike<User>> {
    let existsUser = await this.repo.findOne({
      where: [{ email: body.email }],
    });

    if (!existsUser) {
      throw new UnauthorizedException('User Not Found');
    }

    if (existsUser.password !== body.password)
      throw new UnauthorizedException('check your credintials');
    //remove password from responce
    delete existsUser.password;
    existsUser['status'] = true;
    return existsUser;
  }

  async create(user: CreateUserDto) {
    console.log({ user });

    const newUser: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      company: { id: +user.company },
      branch: { id: +user.branch },
      role: { id: +user.role },
    };

    let userDb = await this.repo.save(newUser);
    return this.repo.findOneBy({ id: userDb.id });
  }

  async findAll() {
    let users = await this.repo
      .createQueryBuilder('user')
      .leftJoin('user.company', 'company')
      .leftJoin('user.role', 'role')
      .leftJoin('user.branch', 'branch')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone',
        'user.password',
        'company.name',
        'company.taxNumber',
        'company.id',
        'role.name',
        'branch.name_ar',
        'branch.id',
        'role.id',
      ])
      .getMany();
    return users;
  }

  async findOne(id: number) {
    let user = await this.repo.findOneBy({ id: id });

    return { ...user, role: user.role.name };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log({ id, updateUserDto });
    // let user: User = await this.repo.findOneBy({ id: id })
    // console.log({ user });
    // // user.company = { id: 3 }
    // if (!user) {
    //   throw new Error('user not found');
    // }
    return this.repo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
