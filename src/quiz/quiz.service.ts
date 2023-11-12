import { BadRequestException, Injectable } from '@nestjs/common';
import { Quiz, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuizService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addChatting(data: Quiz, user: User): Promise<Quiz> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    return this.prismaService.quiz.create({
      data: {
        question: data.question,
        answer: data.answer,
        age: data.age || null,
        user_id: user.id,
      },
    });
  }

  // 조회
  async getUserQuiz(): Promise<Quiz[]> {
    const userQuiz = await this.prismaService.quiz.findMany();

    return userQuiz;
  }
}
