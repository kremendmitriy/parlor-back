import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUnavailableDto } from './dto/unavailable.dto';

@Injectable()
export class UnavailableService {
  constructor(private prisma: PrismaService) {}

  async create(createUnavailableDto: CreateUnavailableDto) {
    const { artistId, date, time, reason } = createUnavailableDto;

    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    const existingUnavailable = await this.prisma.unavailable.findFirst({
      where: {
        artistId,
        date: formattedDate,
        time,
      },
    });

    if (existingUnavailable) {
      throw new Error('This time slot is already marked as unavailable');
    }

    return this.prisma.unavailable.create({
      data: {
        artistId,
        date: formattedDate,
        time,
        reason,
      },
    });
  }

  async findUnavailableTimeByArtist(artistId: string, date: Date) {
    return this.prisma.unavailable.findMany({
      where: {
        artistId,
        date,
      },
    });
  }

  async deleteById(artistId: string, date: Date, time: string): Promise<void> {
    const record = await this.prisma.unavailable.findFirst({
      where: { artistId, date, time },
    });

    if (record) {
      await this.prisma.unavailable.delete({ where: { id: record.id } });
    } else {
      throw new Error('Appointment not found');
    }
  }
}
