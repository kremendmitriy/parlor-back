import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { PrismaService } from 'src/prisma.service';
import { BookingService } from 'src/booking/booking.service';
import { DayOffService } from 'src/day-off/day-off.service';
import { UnavailableService } from 'src/unavailable/unavailable.service';

@Module({
  controllers: [StatusesController],
  providers: [
    StatusesService,
    PrismaService,
    BookingService,
    DayOffService,
    UnavailableService,
  ],
})
export class StatusesModule {}
