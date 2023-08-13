import { TwentyQuestionService } from './twenty-question.service';
import { TwentyQuestion } from '@prisma/client';
import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('스무고개')
@Controller('twenty-question')
export class TwentyQuestionController {
  constructor(private readonly twentyQuestionService: TwentyQuestionService) {}

  @Post()
  @ApiOperation({ summary: '스무고개 페이지 채팅 추가' })
  @ApiBody({ type: CreateChatDto })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async addChatting(
    @Body() data: TwentyQuestion,
    @Req() request,
  ): Promise<TwentyQuestion> {
    const user = request.user; // 현재 로그인된 사용자 정보

    return this.twentyQuestionService.addChatting(data, user);
  }

  @Get()
  @ApiOperation({ summary: '자신의 스무고개 페이지 채팅 조회' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async searchChatting(@Req() request): Promise<TwentyQuestion[]> {
    const user = request.user; // 현재 로그인된 사용자 정보

    return this.twentyQuestionService.getUserTwentyQuestions(user);
  }
}
