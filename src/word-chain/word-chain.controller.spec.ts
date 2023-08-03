import { Test, TestingModule } from '@nestjs/testing';
import { WordChainController } from './word-chain.controller';

describe('WordChainController', () => {
  let controller: WordChainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordChainController],
    }).compile();

    controller = module.get<WordChainController>(WordChainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
