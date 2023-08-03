import { BadRequestException, Injectable } from '@nestjs/common';
import { WordChain } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WordChainService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addChatting(data: WordChain): Promise<WordChain> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    return this.prismaService.wordChain.create({
      data: {
        sender: data.sender,
        content: data.content,
        time: data.time,
      },
    });
  }
}
