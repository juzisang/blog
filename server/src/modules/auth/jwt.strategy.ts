import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from '../../common/interfaces/user.interface';
import { JWT } from '../../app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT.secretKey,
    });
  }

  async validate(payload: User, done: Function) {
    const user = await this.authService.validateUser(payload.name);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
