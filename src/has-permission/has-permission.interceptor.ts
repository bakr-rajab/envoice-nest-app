import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HasPermissionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {


    const request: any = context.switchToHttp().getRequest();
    // const user = request.user; // Assuming you have user information attached during authentication
    const url = request.url;

    console.log('User:',request.user);
    console.log(`URL: ${url}`);


    return next.handle();
  }
}
