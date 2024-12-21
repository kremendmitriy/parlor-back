import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { DayOffService } from './day-off.service';

@Controller('day-off')
export class DayOffController {
  constructor(private readonly dayOffService: DayOffService) {}

  @Get('artist/:artistId')
  async getDayOffsByArtist(@Param('artistId') artistId: string) {
    const dayOffs = await this.dayOffService.findDayOffsByArtist(artistId);
    return dayOffs;
  }

  @Post()
  async addDayOff(@Body() body: { artistId: string; date: string }) {
    const { artistId, date } = body;

    if (!artistId || !date) {
      throw new BadRequestException('Artist ID and date are required.');
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format.');
    }

    const dayOff = await this.dayOffService.createDayOff(artistId, parsedDate);
    return dayOff;
  }
}
