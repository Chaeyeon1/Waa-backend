import {
  Controller,
  Post,
  Body,
  // Get,
  // Req,
  // UseGuards,
  UnauthorizedException,
} from '@nestjs/common';

// import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';

@Controller('signin')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: LoginDto })
  async signin(@Body() data: User) {
    const { userId, password } = data;

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해 주세요.');
    }

    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (!isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해 주세요.');
    }

    return '로그인 완료';
  }
}
