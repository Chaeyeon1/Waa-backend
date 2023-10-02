import { Module } from '@nestjs/common';
import { CounselingController } from './counseling.controller';
import { CounselingService } from './counseling.service';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Module({
  controllers: [CounselingController],
  providers: [CounselingService, PrismaService, MailService, MailerService],
})
export class CounselingModule {}
