// libs/common/guards/gql-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ContextGqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().user;

    if (!user) {
      throw new UnauthorizedException('User context missing');
    }

    return true;
  }
}
