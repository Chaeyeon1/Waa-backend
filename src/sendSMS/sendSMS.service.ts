import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class SendSMSService {
  public constructor(private readonly twilioService: TwilioService) {}

  async sendSMS() {
    return this.twilioService.client.messages.create({
      body: 'SMS Body, sent to the phone!',
      from: process.env.MY_SERVICE_NUMBER,
      to: '+8201086162376',
    });
  }
}
