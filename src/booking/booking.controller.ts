import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking-dto';
import { WorkTimeStatus } from '@prisma/client';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingsService: BookingService) {}

  @Get()
  async findBookingsByArtistWithDate(
    @Param('artistId') artistId: string,
    @Param('date') date: string,
  ) {
    return this.bookingsService.findBookingsByArtistWithDate(
      artistId,
      new Date(date),
    );
  }

  @Get('artist/:artistId')
  async getBookingsByArtist(@Param('artistId') artistId: string) {
    const bookings = await this.bookingsService.findBookingsByArtist(artistId);
    return bookings;
  }

  @Post()
  createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Post('update-status')
  updateBookingStatus(
    @Body()
    { bookingId, status }: { bookingId: string; status: WorkTimeStatus },
  ) {
    return this.bookingsService.updateBookingStatus(bookingId, status);
  }
}
