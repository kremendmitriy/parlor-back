import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WorkTimeStatus, DayOff } from '@prisma/client';

@Injectable()
export class DayOffService {
  constructor(private readonly prisma: PrismaService) {}

  async findDayOffsByArtist(artistId: string): Promise<DayOff[]> {
    return this.prisma.dayOff.findMany({
      where: {
        artistId,
        status: WorkTimeStatus.dayOff,
      },
    });
  }

  async createDayOff(artistId: string, date: Date): Promise<DayOff> {
    return this.prisma.dayOff.create({
      data: {
        artistId,
        date,
        status: WorkTimeStatus.dayOff,
      },
    });
  }

  async removeDayOff(artistId: string, date: Date) {
    return this.prisma.dayOff.deleteMany({
      where: {
        artistId,
        date,
      },
    });
  }
}
