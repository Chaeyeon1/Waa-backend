import { TwentyQuestionService } from './twenty-question.service';
import { TwentyQuestion } from '@prisma/client';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('twenty-question')
export class TwentyQuestionController {
  constructor(private readonly twentyQuestionService: TwentyQuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateChatDto })
  async addChatting(@Body() data: TwentyQuestion): Promise<TwentyQuestion> {
    return this.twentyQuestionService.addChatting(data);
  }
}
