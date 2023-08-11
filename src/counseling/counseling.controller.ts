import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChatDto } from 'src/twenty-question/dto/create-chat.dto';
import { CounselingService } from './counseling.service';
import { Counseling } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateChatDto })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async addChatting(
    @Body() data: Counseling,
    @Req() request,
  ): Promise<Counseling> {
    const user = request.user; // 현재 로그인된 사용자 정보

    return this.counselingService.addChatting(data, user);
  }
}
