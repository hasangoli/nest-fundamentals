import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void): void {
    console.time('Request-response time');
    console.log('Log request in middleware: ', req);

    res.on('finish', () => console.timeEnd('Request-response time'));

    next();
  }
}
