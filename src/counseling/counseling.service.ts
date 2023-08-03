import { BadRequestException, Injectable } from '@nestjs/common';
import { Counseling } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CounselingService {
  constructor(private prismaService: PrismaService) {}

  // 추가
  async addChatting(data: Counseling): Promise<Counseling> {
    if (!data) {
      throw new BadRequestException('no Data');
    }

    return this.prismaService.counseling.create({
      data: {
        sender: data.sender,
        content: data.content,
        time: data.time,
      },
    });
  }
}
