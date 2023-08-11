import { TwentyQuestionService } from './twenty-question.service';
import { TwentyQuestion } from '@prisma/client';
import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChatDto } from './dto/create-chat.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('twenty-question')
export class TwentyQuestionController {
  constructor(private readonly twentyQuestionService: TwentyQuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
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
}
