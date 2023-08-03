import { Test, TestingModule } from '@nestjs/testing';
import { WordChainService } from './word-chain.service';

describe('WordChainService', () => {
  let service: WordChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordChainService],
    }).compile();

    service = module.get<WordChainService>(WordChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
