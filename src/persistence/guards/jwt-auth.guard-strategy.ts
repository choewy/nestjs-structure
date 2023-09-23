import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigPrefix, ExceptionMessage, JwtAuthPayload } from '../constants';
import { JwtConfig } from '@submodule/persistence/configs';

@Injectable()
export class JwtAuthGuardStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: new JwtConfig(ConfigPrefix.JWT).getSecretOption(),
    });
  }

  async validate(payload: JwtAuthPayload) {
    if (payload == null || payload.id == null) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    return payload;
  }
}
