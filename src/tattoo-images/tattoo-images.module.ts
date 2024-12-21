import { Module } from '@nestjs/common';
import { TattooImagesService } from './tattoo-images.service';
import { TattooImagesController } from './tattoo-images.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TattooImagesController],
  providers: [TattooImagesService, PrismaService],
})
export class TattooImagesModule {}
