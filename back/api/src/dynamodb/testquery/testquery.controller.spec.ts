import { Test, TestingModule } from '@nestjs/testing';
import { TestqueryController } from './testquery.controller';

describe('TestqueryController', () => {
  let controller: TestqueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestqueryController],
    }).compile();

    controller = module.get<TestqueryController>(TestqueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
