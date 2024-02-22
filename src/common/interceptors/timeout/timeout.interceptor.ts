import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Logging context in timeout.interceptor: ', context);

    return next.handle().pipe(
      timeout(3000),
      catchError((err: any): Observable<never> => {
        if (err instanceof TimeoutError)
          return throwError(new RequestTimeoutException());

        return throwError(err);
      }),
    );
  }
}
