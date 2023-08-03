import { Test, TestingModule } from '@nestjs/testing';
import { TwentyQuestionService } from './twenty-question.service';

describe('TwentyQuestionService', () => {
  let service: TwentyQuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwentyQuestionService],
    }).compile();

    service = module.get<TwentyQuestionService>(TwentyQuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
