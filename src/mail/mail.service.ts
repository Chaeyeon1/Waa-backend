import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail() {
    //메일 전송 테스트
    await this.mailerService
      .sendMail({
        to: 'slide10245@naver.com',
        subject: '자녀의 위험 의심 단어 목록',
        template: './email',
        context: {
          code: 'cf1a3f828287',
          username: 'Chaeyeon',
          keywords: [
            { value: '자살', count: 6 },
            { value: '따돌림', count: 7 },
          ],
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
