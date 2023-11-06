import { BadRequestException, Injectable } from '@nestjs/common';
import { TwentyQuestion, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TwentyQuestionService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addChatting(data: TwentyQuestion, user: User): Promise<TwentyQuestion> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    return this.prismaService.twentyQuestion.create({
      data: {
        sender: data.sender,
        content: data.content,
        time: data.time,
        user_id: user.id,
      },
    });
  }

  // 조회
  async getUserTwentyQuestions(user: User): Promise<TwentyQuestion[]> {
    const userTwentyQuestion = await this.prismaService.twentyQuestion.findMany(
      {
        where: {
          user_id: user.id,
        },
      },
    );

    return userTwentyQuestion;
  }

  // 전체 삭제
  async deleteAllTwentyQuestions(user: User) {
    await this.prismaService.twentyQuestion.deleteMany({
      where: {
        user_id: user.id,
      },
    });

    return true;
  }
}
