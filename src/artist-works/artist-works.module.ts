import { Module } from '@nestjs/common';
import { ArtistWorksService } from './artist-works.service';
import { ArtistWorksController } from './artist-works.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ArtistWorksController],
  providers: [ArtistWorksService, PrismaService],
})
export class ArtistWorksModule {}
