import { BadRequestException, Injectable } from '@nestjs/common';
import { Counseling, User } from '@prisma/client';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma.service';
import { CounselingDangerousKeywordProps } from './counseling.dto';

@Injectable()
export class CounselingService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  // 추가
  async addChatting(data: Counseling, user: User): Promise<Counseling> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    // 채팅을 추가합니다.
    const newChat = await this.prismaService.counseling.create({
      data: {
        sender: data.sender,
        content: data.content,
        time: data.time,
        user_id: user.id,
      },
    });

    // 추가된 채팅의 내용을 분석하여 위험 의심 키워드를 저장합니다.
    const dangerousKeywords = [
      '시발',
      '자살',
      '왕따',
      '따돌림',
      '욕설',
      '폭력',
      '폭행',
      '술',
      '마약',
      '스트레스',
    ];

    const contentLower = data.content.toLowerCase();

    for (const keyword of dangerousKeywords) {
      if (contentLower.includes(keyword)) {
        await this.saveKeywordCount(user, user.id, keyword, data.content);
      }
    }

    return newChat;
  }

  // 조회
  async getUserCounselings(user): Promise<Counseling[]> {
    const userCounseling = await this.prismaService.counseling.findMany({
      where: {
        user_id: user.id,
      },
    });

    return userCounseling;
  }

  // 전체 삭제
  async deleteAllCounselings(user) {
    await this.prismaService.counseling.deleteMany({
      where: {
        user_id: user.id,
      },
    });

    await this.prismaService.keywordCount.deleteMany({
      where: {
        userId: user.id,
      },
    });

    return true;
  }

  // 자주 등장한 키워드
  async getMostFrequentKeywords(
    user,
  ): Promise<{ keyword: string; count: number }[]> {
    const keywords = await this.prismaService.counseling.findMany({
      where: {
        sender: 'user',
        user_id: user.id,
      },
      select: { content: true },
    });

    const keywordFrequencyMap: { [keyword: string]: number } = {};

    for (const counseling of keywords) {
      const words = counseling.content.split(/\s+/);

      for (const word of words) {
        const normalizedWord = word.toLowerCase();
        if (normalizedWord && normalizedWord.length > 1) {
          keywordFrequencyMap[normalizedWord] =
            (keywordFrequencyMap[normalizedWord] || 0) + 1;
        }
      }
    }

    const sortedKeywords = Object.keys(keywordFrequencyMap).sort(
      (a, b) => keywordFrequencyMap[b] - keywordFrequencyMap[a],
    );

    const topKeywords = sortedKeywords.slice(0, 5);
    const keywordsWithCount = topKeywords.map((keyword) => ({
      keyword,
      count: keywordFrequencyMap[keyword],
    }));

    return keywordsWithCount;
  }

  // 위험 의심 키워드와 횟수를 저장하는 메서드
  async saveKeywordCount(
    user: User,
    userId: number,
    keyword: string,
    content: string,
  ): Promise<void> {
    const existingKeywordContent =
      await this.prismaService.keywordCount.findFirst({
        where: {
          userId,
          content,
        },
      });

    const existingKeywords = await this.prismaService.keywordCount.findMany({
      where: {
        userId,
        keyword,
      },
    });

    const totalExistingCount = existingKeywords.reduce(
      (acc, cur) => acc + cur.count,
      0,
    );

    // 만약 전체 카운트가 6이라면, 5회 초과 이메일 보냄
    if (totalExistingCount >= 5) {
      await this.mailService.sendEmail(user);
    }

    // 키워드 들어온 거 DB에 저장 로직
    if (existingKeywordContent) {
      // 아예 content도 같은 경우는 count만 증가시킴
      await this.prismaService.keywordCount.update({
        where: {
          id: existingKeywordContent.id,
        },
        data: {
          count: existingKeywordContent.count + 1,
        },
      });
    } else {
      // 컨텐츠가 다르다면, 새로운 레코드 생성
      await this.prismaService.keywordCount.create({
        data: {
          userId,
          keyword,
          content,
          count: 1,
        },
      });
    }
  }

  async getDangerousKeywordsContent(
    user,
  ): Promise<CounselingDangerousKeywordProps> {
    const dangerousContent: CounselingDangerousKeywordProps = [];

    const storedInformations = await this.prismaService.keywordCount.findMany({
      where: {
        userId: user.id,
      },
    });

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
            count: storedInformation.count,
            content: [storedInformation.content],
          });
        }
      });
    }

    return dangerousContent;
  }
}
