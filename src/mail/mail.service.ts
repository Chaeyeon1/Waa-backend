import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CounselingService } from 'src/counseling/counseling.service';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly counselingService: CounselingService,
  ) {}

  async sendEmail(user: User) {
    const keywordsData =
      await this.counselingService.getDangerousKeywordsContent({
        user,
      });

    const keywords = keywordsData ?? [];

    await this.mailerService
      .sendMail({
        to: user.email,
        subject: '자녀의 위험 의심 단어 목록',
        template: './email',
        context: {
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

  // 새로운 메서드: 랜덤 인증 코드 생성
  generateRandomCode(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  async sendAuthenticationEmail(user: User): Promise<string> {
    const code = this.generateRandomCode(6); // 6자리 랜덤 인증 코드 생성

    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: '인증 코드',
        template: './emailAuth',
        context: {
          code, // 랜덤 인증 코드 추가
        },
      })
      .then((response) => {
        console.log(response);

        return code;
      })
      .catch((err) => {
        console.log(err);

        return '이메일을 보내는 데 실패하였습니다.';
      });
  }
}
