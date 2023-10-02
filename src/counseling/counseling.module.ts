import { Module } from '@nestjs/common';
import { CounselingController } from './counseling.controller';
import { CounselingService } from './counseling.service';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [CounselingController],
  providers: [CounselingService, PrismaService, MailService],
})
export class CounselingModule {}
