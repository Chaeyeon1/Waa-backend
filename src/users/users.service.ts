import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addTodoItem(data: User): Promise<User> {
    if (!data || !data.userId) {
      throw new BadRequestException('userId is required to add a todo item.');
    }

    return this.prismaService.user.create({
      data: {
        userId: data.userId,
        password: data.password || null,
        username: data.username || null,
        score: data.score || null,
        age: data.age || null,
        accessToken: data.accessToken || null,
        refreshToken: data.refreshToken || null,
      },
    });
  }

  // 전체 조회
  async fetchAllTodos(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  // 단일 조회
  async fetchTodoItem(id: number): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  }

  // 삭제
  async deleteTodoItem(id: number): Promise<User | null> {
    return this.prismaService.user.delete({ where: { id: Number(id) } });
  }

  // 비밀번호 수정
  async updateTodoItem(id: number, password: string): Promise<User | null> {
    return this.prismaService.user.update({
      where: { id: Number(id) },
      data: {
        password,
      },
    });
  }
}
