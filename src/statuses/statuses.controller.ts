import { Controller, Get, Param, Query } from '@nestjs/common';
import { BookingService } from 'src/booking/booking.service';

import { UnavailableService } from 'src/unavailable/unavailable.service';

@Controller('statuses')
export class StatusesController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly unavailableService: UnavailableService,
  ) {}

  @Get('artist/:artistId')
  async getStatuses(
    @Param('artistId') artistId: string,
    @Query('date') date: string,
  ) {
    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

    const [bookings, unavailabilities] = await Promise.all([
      this.bookingService.findBookingsByArtistWithDate(artistId, formattedDate),
      this.unavailableService.findUnavailableTimeByArtist(
        artistId,
        formattedDate,
      ),
    ]);

    return { bookings, unavailabilities };
  }
}
