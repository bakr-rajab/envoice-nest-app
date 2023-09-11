import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from '../../guards/jwt.strategy';
import { CreateUserDto, LoginDto } from '../../dtos/user.dto';
import { UserService } from '../user/user.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    public userService: UserService,
  ) {}
  sign(user: User) {
    return {
      ...user,
      token: this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role.name,
          // mobile: user.mobile,
          // userType: user.userType,
          // defaultLang: user.defaultLang,
          // restaurantId : user.restaurant?._id,
          // driverId : user.driver?._id,
          // cityId : user.city?._id
        },
        { expiresIn: '1d' },
      ),
    };
  }

  async validateUser(token: string, url: string) {
    console.log(token);

    const payload = await this.jwtService.verify(token, {
        secret: process.env.TOKEN_SECRET,
    });
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(payload.id);
    user.role.includes(url);

    /**
     * res => *
     * 
     */


    return user;
  }

  async Login(body: LoginDto) {
    let userStored: User;

    try {
      userStored = await this.userService.findUser(body);
      console.log('userDb', userStored);
      // this.violationGroup.reassignTasksToOnlineUsers()
    } catch (error) {
      throw new UnauthorizedException(error.message, error.code);
    }

    return this.sign(userStored);
  }

  CreateUser(user: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
}
