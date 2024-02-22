import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaultValue: string, ctx: ExecutionContext): any => {
    console.log({ defaultValue });

    const request: any = ctx.switchToHttp().getRequest();

    return request.protocol;
  },
);
