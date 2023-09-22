import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: User): Promise<User> {
    if (
      !data ||
      !data.userId ||
      !data.username ||
      !data.password ||
      !data.age
    ) {
      throw new BadRequestException('필요한 정보를 모두 적어주세요.');
    }

    const hasUserId = await this.prismaService.user.findFirst({
      where: {
        userId: data.userId,
      },
    });

    if (hasUserId) {
      throw new ConflictException('이미 사용중인 아이디 입니다.');
    }

    const hashedPassword = bcrypt.hashSync(data.password, 10);

    return this.prismaService.user.create({
      data: {
        userId: data.userId,
        password: hashedPassword,
        username: data.username,
        score: data.score || 0,
        age: data.age,
        accessToken: data.accessToken || null,
        refreshToken: data.refreshToken || null,
      },
    });
  }

  async findById(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  // 전체 조회
  async searchUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  // 단일 조회
  async searchUser(user: User): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id: Number(user.id) },
    });
  }

  // 삭제
  async deleteUser(user: User): Promise<User | null> {
    return this.prismaService.user.delete({ where: { id: Number(user.id) } });
  }

  // 비밀번호 수정
  async updateUserPassword(user: User, password: string): Promise<boolean> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await this.prismaService.user.update({
      where: { id: Number(user.id) },
      data: {
        password: hashedPassword,
      },
    });

    return true;
  }

  // 스코어 수정
  async updateUserScore(user: User): Promise<User | null> {
    return this.prismaService.user.update({
      where: { id: Number(user.id) },
      data: {
        score: user.score + 1,
      },
    });
  }

  // 닉네임 수정
  async updateUserName(user: User, username: string): Promise<boolean> {
    await this.prismaService.user.update({
      where: { id: Number(user.id) },
      data: {
        username,
      },
    });

    return true;
  }

  // 나이 수정
  async updateUserAge(user: User, age: number): Promise<boolean> {
    await this.prismaService.user.update({
      where: { id: Number(user.id) },
      data: {
        age,
      },
    });

    return true;
  }

  async updateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<User | null> {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: {
        refreshToken,
      },
    });
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string,
  ): Promise<User> {
    const user: User = await this.findById(userId);

    // user에 refreshToken이 없다면 null을 반환 (즉, 토큰 값이 null일 경우)
    if (!user.refreshToken) {
      console.log('null이에요');
      return null;
    }

    // 유저 테이블 내에 정의된 암호화된 refresh_token값과 요청 시 body에 담아준 refresh_token값 비교
    // 만약 isRefreshTokenMatching이 true라면 user 객체를 반환
    if (refreshToken === user.refreshToken) {
      console.log('매칭성공');
      return user;
    }
  }
}
