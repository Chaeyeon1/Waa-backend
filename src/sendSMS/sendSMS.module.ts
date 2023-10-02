import { TwilioModule } from 'nestjs-twilio';
import { Module } from '@nestjs/common';
import { SendSMSController } from './sendSMS.controller';
import { SendSMSService } from './sendSMS.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
    }),
  ],
  controllers: [SendSMSController],
  providers: [SendSMSService, PrismaService],
})
export class SendSMSModule {}
