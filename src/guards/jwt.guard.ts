import { ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
// import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';
// import { UserService } from 'src/modules/user/user.service';
// import { Repository } from 'typeorm';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor( private jwtService: JwtService,
        private readonly reflector:Reflector,
        // private configService: ConfigService,
        private userService: AuthService
        ) {
        super();
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
     async canActivate(context: ExecutionContext) {

        const req=context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        const requiredPermission = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!token) throw new UnauthorizedException();
        // get user 
        try {
            const user =  this.userService.validateUser(token,req.url);

            if (!requiredPermission) {
                return true; // No permissions required, allow access
              }
          
            
            // const user = await this.userService.findOne(payload.id);
            // if (!user) throw new UnauthorizedException('user not found');
            return true;
        } catch (e) {
            console.log(e);
            
            if (e instanceof HttpException) throw e;
            throw new UnauthorizedException();
        }

    }

    // 

    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

  

}