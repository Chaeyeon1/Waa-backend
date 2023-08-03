import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateChatDto } from 'src/twenty-question/dto/create-chat.dto';
import { CounselingService } from './counseling.service';
import { Counseling } from '@prisma/client';

@Controller('counseling')
export class CounselingController {
  constructor(private readonly counselingService: CounselingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateChatDto })
  async addChatting(@Body() data: Counseling): Promise<Counseling> {
    return this.counselingService.addChatting(data);
  }
}
