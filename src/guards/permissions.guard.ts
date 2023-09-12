import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private userService: AuthService, private readonly reflector:Reflector) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    
    const req=context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);
    const requiredPermission = this.reflector.get<string[]>('permissions', context.getHandler());
    // if (!token) throw new UnauthorizedException();
    // get user 
    try {
        // const user =  this.userService.validateUser(token,req.url);

        if (!requiredPermission) {
            return true; // No permissions required, allow access
          }
          console.log(requiredPermission);
          
      
        
        // const user = await this.userService.findOne(payload.id);
        // if (!user) throw new UnauthorizedException('user not found');
        return true;
    } catch (e) {
        console.log(e);
        
        if (e instanceof HttpException) throw e;
        throw new UnauthorizedException();
    }



    return true;
  }
}
