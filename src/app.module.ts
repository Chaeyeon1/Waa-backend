import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CounselingModule } from './counseling/counseling.module';
import { TwentyQuestionModule } from './twenty-question/twenty-question.module';
import { WordChainModule } from './word-chain/word-chain.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CounselingModule,
    TwentyQuestionModule,
    WordChainModule,
    MailModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
