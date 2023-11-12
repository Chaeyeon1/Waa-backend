import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuizDto } from './quizDto';
import { QuizService } from './quiz.service';
import { Quiz } from '@prisma/client';

@ApiTags('퀴즈')
@Controller('/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: '퀴즈 추가' })
  @ApiBody({ type: CreateQuizDto })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async addChatting(@Body() data: Quiz, @Req() request): Promise<Quiz> {
    const user = request.user;

    return this.quizService.addChatting(data, user);
  }

  @Get()
  @ApiOperation({ summary: '퀴즈 조회' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async searchChatting(): Promise<Quiz[]> {
    return this.quizService.getUserQuiz();
  }
}
