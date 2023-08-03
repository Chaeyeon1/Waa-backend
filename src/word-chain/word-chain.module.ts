import { Module } from '@nestjs/common';
import { WordChainController } from './word-chain.controller';
import { WordChainService } from './word-chain.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WordChainController],
  providers: [WordChainService, PrismaService],
})
export class WordChainModule {}
