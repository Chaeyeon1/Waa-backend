import { Test, TestingModule } from '@nestjs/testing';
import { MemoryGameController } from './memory-game.controller';

describe('MemoryGameController', () => {
  let controller: MemoryGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoryGameController],
    }).compile();

    controller = module.get<MemoryGameController>(MemoryGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
