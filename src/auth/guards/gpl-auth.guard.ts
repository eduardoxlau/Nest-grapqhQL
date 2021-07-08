import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { whiteListResolver } from '../auth.constants';

export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const fieldName = ctx.getInfo().fieldName;
    if (whiteListResolver.includes(fieldName)) return true;

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext): Express.Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(_, user, err) {
    if (err) throw new UnauthorizedException(err.message);
    return user;
  }
}
