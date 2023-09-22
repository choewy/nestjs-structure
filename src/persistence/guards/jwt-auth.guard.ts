import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ExceptionMessage, MetadataKey } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(MetadataKey.PUBLIC, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, _: any, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    context.switchToHttp().getRequest().user = user;

    return user;
  }
}
