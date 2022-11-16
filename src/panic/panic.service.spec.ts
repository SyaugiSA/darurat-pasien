import { Test, TestingModule } from '@nestjs/testing';
import { PanicService } from './panic.service';

describe('PanicService', () => {
  let service: PanicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanicService],
    }).compile();

    service = module.get<PanicService>(PanicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
