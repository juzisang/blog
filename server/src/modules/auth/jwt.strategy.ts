import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserPayload } from '@app/interfaces/userpayload.interface';
import { JWT } from '@app/app.config';

import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.secretKey,
    });
  }

  async validate(payload: UserPayload) {
    const user = await this.authService.validateUser(payload.uid);
    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
