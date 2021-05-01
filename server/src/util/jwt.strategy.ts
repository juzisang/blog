import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../app.interface';
import { UserService } from '../service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // 获取请求头 Authorization:bearer Token
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false, secretOrKey: process.env.JWT_SECRET });
  }
  
  async validate(payload: JwtPayload) {
    // 这里返回的数据，将会注入到 req.user
    return this.userService.getUser(payload.id)
  }
}