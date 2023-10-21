import { Module } from '@nestjs/common';
import { MemoryGameController } from './memory-game.controller';
import { MemoryGameService } from './memory-game.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MemoryGameController],
  providers: [MemoryGameService, PrismaService],
})
export class MemoryGameModule {}
