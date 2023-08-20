import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateChatDto } from 'src/twenty-question/dto/create-chat.dto';
import { WordChainService } from './word-chain.service';
import { WordChain } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('끝말잇기')
@Controller('word-chain')
export class WordChainController {
  constructor(private readonly wordChainService: WordChainService) {}

  @Post()
  @ApiOperation({ summary: '끝말잇기 페이지 채팅 추가' })
  @ApiBody({ type: CreateChatDto })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async addChatting(
    @Body() data: WordChain,
    @Req() request,
  ): Promise<WordChain> {
    const user = request.user; // 현재 로그인된 사용자 정보

    return this.wordChainService.addChatting(data, user);
  }

  @Get()
  @ApiOperation({ summary: '자신의 끝말잇기 페이지 채팅 조회' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async searchChatting(@Req() request): Promise<WordChain[]> {
    const user = request.user;

    return this.wordChainService.getUserWordChains(user);
  }

  @Delete()
  @ApiOperation({ summary: '자신의 끝말잇기 페이지 채팅 전체 삭제' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async clearChatting(@Req() request): Promise<boolean> {
    const user = request.user;

    return this.wordChainService.deleteAllWordChains(user);
  }
}
