import { Controller, Get, Headers } from '@nestjs/common';
import { MemoryGameService } from './memory-game.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('memory-game')
export class MemoryGameController {
  constructor(private readonly memoryService: MemoryGameService) {}

  @Get()
  @ApiOperation({ summary: '좌표 던지기' })
  async randomGenerateCoordinates(
    @Headers('count') count: number,
  ): Promise<number[][]> {
    const numberOfCoordinates = count;
    const randomCoordinates = [];

    for (let i = 0; i < numberOfCoordinates; i++) {
      const x = Math.floor(Math.random() * 8) + 1; // 1부터 8까지의 랜덤 x 좌표
      const y = Math.floor(Math.random() * 8) + 1; // 1부터 8까지의 랜덤 y 좌표
      randomCoordinates.push([x, y]);
    }

    return randomCoordinates;
  }
}
