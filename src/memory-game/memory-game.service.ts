import { Injectable } from '@nestjs/common';
import { MemoryGame, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { MemoryGameRankingDto } from './memoryGameDto';

@Injectable()
export class MemoryGameService {
  constructor(private prismaService: PrismaService) {}

  // 스코어 추가하기
  async addMemoryGameScore(data: MemoryGame, user: User): Promise<MemoryGame> {
    return this.prismaService.memoryGame.create({
      data: {
        score: data.score ?? 0,
        userId: user.id,
        userName: user.username,
      },
    });
  }

  // 랭킹
  async getMemoryGameRanking(): Promise<MemoryGameRankingDto[]> {
    const ranking = await this.prismaService.memoryGame.findMany({
      orderBy: {
        score: 'desc',
      },
    });

    return ranking.map((record) => ({
      username: record.userName,
      score: record.score,
    }));
  }
}
