import { Test, TestingModule } from '@nestjs/testing';
import { TwentyQuestionController } from './twenty-question.controller';

describe('TwentyQuestionController', () => {
  let controller: TwentyQuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwentyQuestionController],
    }).compile();

    controller = module.get<TwentyQuestionController>(TwentyQuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
