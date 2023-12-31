import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CounselingDangerousKeywordProps } from 'src/counseling/counseling.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
  ) {}

  async getDangerousKeywordsContent(
    user: User,
  ): Promise<CounselingDangerousKeywordProps> {
    const dangerousContent: CounselingDangerousKeywordProps = [];

    const storedInformations = await this.prismaService.keywordCount.findMany({
      where: {
        userId: user.id,
      },
    });

    console.log('user', user);

    if (storedInformations) {
      storedInformations.forEach((storedInformation) => {
        // dangerousContent에 해당 키워드가 있는지 확인합니다.
        const existingEntry = dangerousContent.find(
          (dangerous) => dangerous.keyword === storedInformation.keyword,
        );

        if (existingEntry) {
          // 만약 해당 키워드가 이미 있다면, content 배열을 업데이트합니다.
          existingEntry.content.push(storedInformation.content);
          // count를 업데이트하고 storedInformation.count를 추가합니다.
          existingEntry.count += storedInformation.count;
        } else {
          // 만약 일치하는 키워드가 없다면, 새 항목을 만듭니다.
          dangerousContent.push({
            keyword: storedInformation.keyword,
            count: storedInformation.count + 1,
            content: [storedInformation.content],
          });
        }
      });
    }

    return dangerousContent;
  }

  async sendEmail(user: User) {
    const keywordsData = await this.getDangerousKeywordsContent(user);

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

  // 유저 아이디로 유저 정보 찾기
  async findById(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  // 비밀번호 수정
  async updateUserPassword(user: User, password: string): Promise<boolean> {
    // 비밀번호 해시화
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 사용자 비밀번호 업데이트
    const updatedUser = await this.prismaService.user.update({
      where: { id: Number(user.id) },
      data: {
        password: hashedPassword,
      },
    });

    if (!updatedUser) {
      throw new Error(
        '사용자를 찾을 수 없거나 비밀번호 업데이트 중에 문제가 발생했습니다.',
      );
    }

    return true;
  }

  async setForgetPassword(userId: { userId: string }): Promise<string> {
    const code = this.generateRandomCode(12);

    const user = await this.findById(userId.userId);

    this.updateUserPassword(user, code);

    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: '인증 코드',
        template: './emailforgetPassword',
        context: {
          code, // 랜덤 인증 코드 추가
        },
      })
      .then(() => {
        return code;
      })
      .catch((err) => {
        console.log(err);

        return '이메일을 보내는 데 실패하였습니다.';
      });
  }

  async sendAuthenticationEmail(user: User): Promise<string> {
    const code = this.generateRandomCode(6);

    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: '인증 코드',
        template: './emailAuth',
        context: {
          code, // 랜덤 인증 코드 추가
        },
      })
      .then(() => {
        return code;
      })
      .catch((err) => {
        console.log(err);

        return '이메일을 보내는 데 실패하였습니다.';
      });
  }
}
