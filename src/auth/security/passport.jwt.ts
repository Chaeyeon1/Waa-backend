import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { env } from 'process';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.SECRET_KEY,
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<User> {
    const { userId } = payload;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException({ message: '회원 존재하지 않음.' });
    }

    return user;
  }
}

export interface Payload {
  userId: string;
}
