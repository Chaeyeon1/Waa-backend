import { BadRequestException, Injectable } from '@nestjs/common';
import { TwentyQuestion } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TwentyQuestionService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addChatting(data: TwentyQuestion): Promise<TwentyQuestion> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    return this.prismaService.twentyQuestion.create({
      data: {
        sender: data.sender,
        content: data.content,
        time: data.time,
      },
    });
  }
}
