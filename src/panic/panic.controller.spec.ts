import { Test, TestingModule } from '@nestjs/testing';
import { PanicController } from './panic.controller';
import { PanicService } from './panic.service';

describe('PanicController', () => {
  let controller: PanicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanicController],
      providers: [PanicService],
    }).compile();

    controller = module.get<PanicController>(PanicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
