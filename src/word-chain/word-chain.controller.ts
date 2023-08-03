import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChatDto } from 'src/twenty-question/dto/create-chat.dto';
import { WordChainService } from './word-chain.service';
import { WordChain } from '@prisma/client';

@Controller('word-chain')
export class WordChainController {
  constructor(private readonly wordChainService: WordChainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateChatDto })
  async addChatting(@Body() data: WordChain): Promise<WordChain> {
    return this.wordChainService.addChatting(data);
  }
}
