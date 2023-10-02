import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CounselingModule } from './counseling/counseling.module';
import { TwentyQuestionModule } from './twenty-question/twenty-question.module';
import { WordChainModule } from './word-chain/word-chain.module';
import { AuthModule } from './auth/auth.module';
import { SendSMSModule } from './sendSMS/sendSMS.module';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { CounselingService } from './counseling/counseling.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CounselingModule,
    TwentyQuestionModule,
    WordChainModule,
    SendSMSModule,
    MailModule,
    MailerModule,
  ],
  controllers: [AppController, MailController],
  providers: [
    AppService,
    MailerService,
    MailService,
    CounselingService,
    PrismaService,
    MailService,
  ],
})
export class AppModule {}
