import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Payload } from './security/passport.jwt';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(loginDto: User): Promise<User> {
    const user = await this.usersService.findById(loginDto.userId);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials!');
    }

    return user;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: Payload = {
      userId: user.userId,
    };
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(user: User): Promise<string> {
    const payload: Payload = {
      userId: user.userId,
    };
    return this.jwtService.signAsync(
      { userId: payload.userId },
      {
        secret: env.JWT_REFRESH_SECRET,
        expiresIn: env.JWT_REFRESH_EXPIRATION_TIME,
      },
    );
  }
}
