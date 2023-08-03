import { Module } from '@nestjs/common';
import { TwentyQuestionController } from './twenty-question.controller';
import { TwentyQuestionService } from './twenty-question.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TwentyQuestionController],
  providers: [TwentyQuestionService, PrismaService],
})
export class TwentyQuestionModule {}
