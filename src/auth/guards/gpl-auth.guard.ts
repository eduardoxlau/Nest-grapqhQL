import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Express.Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(_, user, err) {
    if (err) throw new UnauthorizedException(err.message);
    return user;
  }
}
