import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllArtists() {
    return this.prisma.artist.findMany();
  }

  async getArtistById(id: string) {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }
}
