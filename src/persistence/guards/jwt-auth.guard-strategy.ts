import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtConfig } from '../configs';
import { ExceptionMessage, JwtAuthPayload } from '../constants';

@Injectable()
export class JwtAuthGuardStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: new JwtConfig('JWT').getOptions().secret,
    });
  }

  async validate(payload: JwtAuthPayload) {
    if (payload == null || payload.id == null) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    return payload;
  }
}
