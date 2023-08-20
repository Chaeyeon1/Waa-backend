import { BadRequestException, Injectable } from '@nestjs/common';
import { WordChain } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WordChainService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addChatting(data: WordChain, user): Promise<WordChain> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    return this.prismaService.wordChain.create({
      data: {
        sender: data.sender,
        content: data.content,
        time: data.time,
        user_id: user.id,
      },
    });
  }

  // 조회
  async getUserWordChains(user): Promise<WordChain[]> {
    const userWordChains = await this.prismaService.wordChain.findMany({
      where: {
        user_id: user.id,
      },
    });

    return userWordChains;
  }

  // 전체 삭제
  async deleteAllWordChains(user) {
    await this.prismaService.wordChain.deleteMany({
      where: {
        user_id: user.id,
      },
    });

    return true;
  }
}
