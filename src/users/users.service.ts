import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async createUser(data: User): Promise<User> {
    if (!data || !data.userId || !data.username || !data.password) {
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

    return this.prismaService.user.create({
      data: {
        userId: data.userId,
        password: data.password,
        username: data.username,
        score: data.score || 0,
        // 나이는 추후 설정 가능하도록
        age: data.age || null,
        accessToken: data.accessToken || null,
        refreshToken: data.refreshToken || null,
      },
    });
  }

  // 전체 조회
  async searchUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  // 단일 조회
  async searchUser(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  }

  // 삭제
  async deleteUser(id: number): Promise<User | null> {
    return this.prismaService.user.delete({ where: { id: Number(id) } });
  }

  // 비밀번호 수정
  async updateUser(id: number, password: string): Promise<User | null> {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: {
        password,
      },
    });
  }
}
