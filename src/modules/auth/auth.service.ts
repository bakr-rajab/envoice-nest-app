import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../dtos/user.dto';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';
import { UserRole } from 'src/enums/userRole.enum';
import { IntegrationService } from '../integration/integration.service';
import { InvoiceLoginDto } from '../integration/dtos/invoiceLogin.dto';
import { CompanyService } from '../company/company.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private integrationService: IntegrationService,
    private userService: UserService,
    private companyService: CompanyService,
  ) {}
  sign(user: User) {
    return {
      ...user,
      token: this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role?.name,
          client_id: user.company?.clientId,
          client_secret: user.company?.clientSecret1,
          pin: user.company?.pin,
          certificate: user.company?.certificate,
          access_token: user.company?.clientSecret2,
          dllLibPath: user.company?.dllLibPath,
          companyId: user.company?.id,
          internalId: user?.branch?.invoiceSerial,
        },
        { expiresIn: '1h' },
      ),
    };
  }

  async Login(body: LoginDto) {
    let userStored: User;
    try {
      userStored = await this.userService.findUser(body);
      
      if (userStored.role.name === UserRole.USER) {
        if (userStored.online) {
          throw new UnauthorizedException(
            'user alredy logined on another device',
          );
        }
        if (userStored.company.endDate < new Date()) {
          throw new UnauthorizedException('انهت المدة ');
        }
        // login to envoice and store token in company
        const loginBody: InvoiceLoginDto = {
          client_id: userStored.company.clientId,
          client_secret: userStored.company.clientSecret1,
        };
        const access_token = await this.integrationService.invoiceLogin(
          loginBody,
        );

        await this.companyService.update(userStored.company.id, {
          clientSecret2: access_token,
        });
        userStored = await this.userService.findUser(body);
      }
      await this.userService.update(userStored.id, { online: true });
      return this.sign(userStored);
    } catch (error) {
      throw new UnauthorizedException(error.message, error.code);
    }
  }
}
