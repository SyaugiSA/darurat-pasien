import { Test, TestingModule } from '@nestjs/testing';
import { NakesController } from './nakes.controller';
import { NakesService } from './nakes.service';

describe('NakesController', () => {
  let controller: NakesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NakesController],
      providers: [NakesService],
    }).compile();

    controller = module.get<NakesController>(NakesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
