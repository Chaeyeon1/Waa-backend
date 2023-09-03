import { BadRequestException, Injectable } from '@nestjs/common';
import { Counseling } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CounselingService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addChatting(data: Counseling, user): Promise<Counseling> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    return this.prismaService.counseling.create({
      data: {
        sender: data.sender,
        content: data.content,
        time: data.time,
        user_id: user.id,
      },
    });
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

    return true;
  }

  // 자주 등장한 키워드
  async getMostFrequentKeywords(
    user,
  ): Promise<{ keyword: string; count: number }[]> {
    const keywords = await this.prismaService.counseling.findMany({
      where: {
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

  // 위험 의심 키워드
  async getDangerousKeywordsContent(user): Promise<string[]> {
    // 위험 의심 키워드 정의
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

    const counselingContent = await this.prismaService.counseling.findMany({
      where: {
        user_id: user.id,
      },
      select: { content: true },
    });

    const dangerousContent = [];

    for (const counseling of counselingContent) {
      const content = counseling.content;
      const contentLower = content.toLowerCase();

      // counseling 내용이 위험 의심 키워드를 포함하는지 확인
      if (dangerousKeywords.some((keyword) => contentLower.includes(keyword))) {
        dangerousContent.push(content);
      }
    }

    return dangerousContent;
  }
}
