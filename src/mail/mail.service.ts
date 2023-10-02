import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CounselingService } from 'src/counseling/counseling.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly counselingService: CounselingService,
  ) {}

  async sendEmail(user) {
    const keywords = await this.counselingService.getDangerousKeywordsContent({
      user,
    });

    await this.mailerService
      .sendMail({
        to: 'slide10245@naver.com',
        subject: '자녀의 위험 의심 단어 목록',
        template: './email',
        context: {
          code: 'cf1a3f828287',
          username: 'Chaeyeon',
          keywords,
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
