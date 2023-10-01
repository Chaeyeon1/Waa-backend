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
        await this.saveKeywordCount(user.id, keyword, data.content);
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
    userId: number,
    keyword: string,
    content: string,
  ): Promise<void> {
    const existingKeywordCount =
      await this.prismaService.keywordCount.findFirst({
        where: {
          userId,
          keyword,
        },
      });

    if (existingKeywordCount) {
      // 이미 해당 키워드에 대한 카운트가 있는 경우, 카운트를 증가시킴
      await this.prismaService.keywordCount.update({
        where: {
          id: existingKeywordCount.id,
        },
        data: {
          count: existingKeywordCount.count + 1,
        },
      });
    } else {
      // 해당 키워드에 대한 카운트가 없는 경우, 새로운 레코드 생성
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

  async getDangerousKeywordsContent(user): Promise<string[]> {
    const dangerousContent = [];

    const keywordCount = await this.prismaService.keywordCount.findMany({
      where: {
        userId: user.id,
      },
    });

    if (keywordCount) {
      // 해당 키워드에 대한 카운트가 있는 경우, 키워드와 카운트 정보를 반환
      keywordCount.map((keyword) => {
        dangerousContent.push({
          keyword: keyword.keyword,
          count: keyword.count,
          content: keyword.content,
        });
      });
    }

    return dangerousContent;
  }
}
