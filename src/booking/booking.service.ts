import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WorkTimeStatus } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking-dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const { artistId, date, time, customerName, customerPhone, customerEmail } =
      createBookingDto;

    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        artistId,
        date: formattedDate,
        time,
      },
    });

    if (existingBooking) {
      throw new Error('This time slot is already booked');
    }

    const booking = await this.prisma.booking.create({
      data: {
        artistId,
        date: formattedDate,
        time,
        customerName,
        customerPhone,
        customerEmail,
        status: WorkTimeStatus.booked,
      },
    });

    return booking;
  }

  async findBookingsByArtistWithDate(artistId: string, date: Date) {
    return this.prisma.booking.findMany({
      where: {
        artistId,
        date,
      },
    });
  }

  async findBookingsByArtist(artistId: string) {
    return this.prisma.booking.findMany({
      where: {
        artistId,
        status: WorkTimeStatus.booked,
      },
    });
  }

  async updateBookingStatus(bookingId: string, status: WorkTimeStatus) {
    const booking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status },
    });

    return booking;
  }
}
