import { Module } from '@nestjs/common';
import { CounselingController } from './counseling.controller';
import { CounselingService } from './counseling.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CounselingController],
  providers: [CounselingService, PrismaService],
})
export class CounselingModule {}
