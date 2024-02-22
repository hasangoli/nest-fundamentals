import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      'Log context in wrap-response.interceptor before handling request: ',
      context,
    );

    return next.handle().pipe(
      map((data: any): { useInterceptor: boolean; data: any } => ({
        useInterceptor: true,
        data,
      })),
    );
  }
}
