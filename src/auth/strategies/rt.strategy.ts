import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { config } from '@/base/config';
import { IJWTPayload, IJwtPayloadWithRt } from '../interfaces/auth.interface';
import * as exc from '@base/api/exception.reslover';
import { UserService } from '@/user/user.service';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userService: UserService) {
    super({
      ignoreExpiration: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log('vaoday', request?.cookies?.['auth-cookie']);
          const data = request?.cookies?.['auth-cookie'];
          if (!data) {
            return null;
          }
          console.log(data);
          return data;
        },
      ]),
      secretOrKey: config.JWT_RT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    console.log('xuong cgo ay');
    if (!payload) {
      throw new exc.Forbidden({ message: 'invalid jwt token' });
    }
    const token = req?.cookies['auth-cookie'];
    if (!token) {
      throw new exc.Forbidden({ message: 'invalid refresh token' });
    }
    const user = await this.userService.validRefreshToken(payload.sub, token);
    if (!user) {
      throw new exc.Forbidden({ message: 'token expired' });
    }

    return user;
  }
}
