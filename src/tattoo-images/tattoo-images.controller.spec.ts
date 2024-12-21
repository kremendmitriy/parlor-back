import { Test, TestingModule } from '@nestjs/testing';
import { TattooImagesController } from './tattoo-images.controller';
import { TattooImagesService } from './tattoo-images.service';

describe('TattooImagesController', () => {
  let controller: TattooImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TattooImagesController],
      providers: [TattooImagesService],
    }).compile();

    controller = module.get<TattooImagesController>(TattooImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
