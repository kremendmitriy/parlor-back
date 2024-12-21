import { Controller, Delete, Get, Post } from '@nestjs/common';
import { TattooImagesService } from './tattoo-images.service';

@Controller('tattoo-images')
export class TattooImagesController {
  constructor(private readonly tattooImagesService: TattooImagesService) {}

  @Get()
  async getAllImages() {
    const images = await this.tattooImagesService.getAllImages();
    return images;
  }

  @Post('seed')
  async seedImages() {
    const result = await this.tattooImagesService.seedImages();
    return { message: result };
  }

  @Delete('clear')
  async clearImages() {
    const result = await this.tattooImagesService.clearImages();
    return { message: result };
  }
}
