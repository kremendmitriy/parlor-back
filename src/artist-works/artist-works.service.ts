import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateArtistWorkDto } from './dto/artist-work-dto';
import { UpdateArtistWorkDto } from './dto/artist-work-dto';

@Injectable()
export class ArtistWorksService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistWorkDto: CreateArtistWorkDto) {
    return this.prisma.artistWork.create({
      data: {
        workUrl: createArtistWorkDto.workUrl,
        artistId: createArtistWorkDto.artistId,
      },
    });
  }

  async findAllByArtist(artistId: string) {
    return this.prisma.artistWork.findMany({
      where: { artistId },
    });
  }

  async findOne(id: string) {
    return this.prisma.artistWork.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateArtistWorkDto: UpdateArtistWorkDto) {
    return this.prisma.artistWork.update({
      where: { id },
      data: updateArtistWorkDto,
    });
  }

  async remove(id: string) {
    return this.prisma.artistWork.delete({
      where: { id },
    });
  }
}
