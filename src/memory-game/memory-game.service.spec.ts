import { Test, TestingModule } from '@nestjs/testing';
import { MemoryGameService } from './memory-game.service';

describe('MemoryGameService', () => {
  let service: MemoryGameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoryGameService],
    }).compile();

    service = module.get<MemoryGameService>(MemoryGameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
