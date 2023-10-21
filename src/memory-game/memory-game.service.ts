import { Injectable } from '@nestjs/common';
import { MemoryGame, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MemoryGameService {
  constructor(private prismaService: PrismaService) {}

  // 스코어 추가하기
  async addMemoryGameScore(data: MemoryGame, user: User): Promise<MemoryGame> {
    return this.prismaService.memoryGame.create({
      data: {
        score: data.score ?? 0,
        userId: user.id,
      },
    });
  }
}
