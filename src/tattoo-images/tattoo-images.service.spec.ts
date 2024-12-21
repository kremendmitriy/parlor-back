import { Test, TestingModule } from '@nestjs/testing';
import { TattooImagesService } from './tattoo-images.service';

describe('TattooImagesService', () => {
  let service: TattooImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TattooImagesService],
    }).compile();

    service = module.get<TattooImagesService>(TattooImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
