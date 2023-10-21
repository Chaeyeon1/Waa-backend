import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryGameService {
  // 랜덤생성
  async generateRandomCoordinates() {
    const x = Math.floor(Math.random() * 8) + 1;
    const y = Math.floor(Math.random() * 8) + 1;
    return [x, y];
  }
}
