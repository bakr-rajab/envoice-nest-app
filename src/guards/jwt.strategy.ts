import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { UserService } from '../modules/user/user.service';

import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserRole } from '../enums/userRole.enum';

export interface JwtUser {
  _id: string;
  username: string;
  role: UserRole
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.TOKEN_SECRET,
      algorithm: "HS256"
    });
  }

  async validate(payload: any) {

    let tokenPayload: JwtUser
    tokenPayload = {
      _id: payload._id,
      username: payload.username,
      role: payload.role
    }

    return tokenPayload;
  }


}
