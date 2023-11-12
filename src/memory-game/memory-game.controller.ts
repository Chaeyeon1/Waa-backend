import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MemoryGameService } from './memory-game.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMemoryGameDto, MemoryGameRankingDto } from './memoryGameDto';
import { AuthGuard } from '@nestjs/passport';
import { MemoryGame } from '@prisma/client';

@ApiTags('기억력 테스트')
@Controller('memory-game')
export class MemoryGameController {
  constructor(private readonly memoryGameService: MemoryGameService) {}

  @Get()
  @ApiOperation({ summary: '좌표 던지기' })
  async randomGenerateCoordinates(
    @Headers('count') count: number,
  ): Promise<number[][]> {
    const numberOfCoordinates = count;
    const randomCoordinates = new Set<string>(); // Change the set type to string

    while (randomCoordinates.size < numberOfCoordinates) {
      const x = Math.floor(Math.random() * 3);
      const y = Math.floor(Math.random() * 3);
      const coordinateString = `${x},${y}`; // Convert coordinates to a string

      randomCoordinates.add(coordinateString);
    }

    const result = Array.from(randomCoordinates).map((coordinateString) => {
      const [x, y] = coordinateString.split(',').map(Number);
      return [x, y];
    });

    return result;
  }

  @Post()
  @ApiOperation({ summary: '퀴즈 추가' })
  @ApiBody({ type: CreateMemoryGameDto })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  async addChatting(
    @Body() data: MemoryGame,
    @Req() request,
  ): Promise<MemoryGame> {
    const user = request.user;

    return this.memoryGameService.addMemoryGameScore(data, user);
  }

  @Get('/ranking')
  @ApiOperation({ summary: '메모리게임 랭킹 조회' })
  async searchChatting(): Promise<MemoryGameRankingDto[]> {
    return this.memoryGameService.getMemoryGameRanking();
  }
}
