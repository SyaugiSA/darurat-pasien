import { Test, TestingModule } from '@nestjs/testing';
import { NakesService } from './nakes.service';

describe('NakesService', () => {
  let service: NakesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NakesService],
    }).compile();

    service = module.get<NakesService>(NakesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
