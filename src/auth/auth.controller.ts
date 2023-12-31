import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('signin')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginDto })
  async signin(@Body() data: User) {
    try {
      const { userId, password } = data;

      const user = await this.userService.findById(userId);
      if (!user) {
        throw new UnauthorizedException(
          '아이디 또는 비밀번호를 확인해 주세요.',
        );
      }

      const isSamePassword: boolean = bcrypt.compareSync(
        password,
        user.password,
      );

      if (!isSamePassword) {
        throw new UnauthorizedException(
          '이메일 또는 비밀번호를 확인해 주세요.',
        );
      }

      const payload = { userId: user.userId };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' });

      this.userService.updateRefreshToken(user.id, refreshToken);

      return { accessToken, refreshToken, userId, id: user.id };
    } catch (error) {
      // 예외가 발생하면 이 부분에서 처리하고자 하는 반환 값을 설정합니다.
      throw new HttpException(
        error.message || '알 수 없는 오류 발생',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('refresh')
  @ApiOperation({ summary: '액세스 토큰 재발급' })
  async refresh(@Body() data: RefreshTokenDto) {
    const { refreshToken } = data;

    try {
      const decoded = this.jwtService.verify(refreshToken);

      // 받은 리프레시 토큰이랑 디비에 저장되어있는 리프레시 토큰이 같은지 확인
      const user = this.userService.getUserIfRefreshTokenMatches(
        refreshToken,
        decoded.userId,
      );

      if (user) {
        const payload = { userId: (await user).userId };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
      }
    } catch (error) {
      throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
    }
  }
}
