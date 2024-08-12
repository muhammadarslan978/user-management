import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'test-jwt-key',
    });
  }

  async validate(payload: any) {
    return {
      id: payload._id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
