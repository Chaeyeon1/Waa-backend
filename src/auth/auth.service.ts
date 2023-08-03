import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userId: string, password: string) {
    // 사용자 이름이 이미 존재하는지 확인합니다.
    console.log(userId, password);
    const existingUser = await this.prismaService.user.findUnique({
      // findUnique는 unique한 값만 가능
      where: { userId },
    });
    if (existingUser) {
      return { error: 'Username already exists' };
    }

    // 비밀번호를 해싱하여 저장합니다.
    const hashedPassword = await this.hashPassword(password);

    // 사용자를 생성하고 데이터베이스에 저장합니다.
    const newUser = await this.prismaService.user.create({
      data: { userId, password: hashedPassword },
    });

    // AccessToken 생성
    const accessToken = this.generateAccessToken(newUser.id);
    // RefreshToken 생성
    const refreshToken = this.generateRefreshToken(newUser.id);

    // 생성한 토큰들을 사용자에게 반환합니다.
    return {
      accessToken,
      refreshToken,
      message: 'Signup successful',
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private generateAccessToken(userId: number): string {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '15m' });
  }

  private generateRefreshToken(userId: number): string {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '7d' });
  }
}
