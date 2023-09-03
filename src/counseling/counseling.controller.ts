import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from 'src/twenty-question/dto/create-chat.dto';
import { CounselingService } from './counseling.service';
import { Counseling } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('상담')
@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  @Post()
  @ApiOperation({ summary: '상담 페이지 채팅 추가' })
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

  @Get()
  @ApiOperation({ summary: '자신의 상담 페이지 채팅 조회' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async searchChatting(@Req() request): Promise<Counseling[]> {
    const user = request.user;

    return this.counselingService.getUserCounselings(user);
  }

  @Delete()
  @ApiOperation({ summary: '자신의 상담 페이지 채팅 전체 삭제' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async clearChatting(@Req() request): Promise<boolean> {
    const user = request.user;

    return this.counselingService.deleteAllCounselings(user);
  }

  @Get('most-frequent')
  @ApiOperation({ summary: '자신의 상담 페이지 자주 등장한 키워드' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async getMostFrequentKeywords(
    @Req() request,
  ): Promise<{ keyword: string; count: number }[]> {
    const user = request.user;
    return this.counselingService.getMostFrequentKeywords(user);
  }

  @Get('dangerous-keyword')
  @ApiOperation({ summary: '위험의심 키워드' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async getDangerousKeywordsContent(
    @Req() request,
  ): Promise<{ dangerousContent: string[] }> {
    const user = request.user;

    const dangerousContent =
      await this.counselingService.getDangerousKeywordsContent(user);

    return { dangerousContent };
  }
}
