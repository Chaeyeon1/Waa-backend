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
}
