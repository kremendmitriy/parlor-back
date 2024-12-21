import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UnavailableService } from './unavailable.service';
import { CreateUnavailableDto } from './dto/unavailable.dto';

@Controller('unavailable')
export class UnavailableController {
  constructor(private readonly unavailableService: UnavailableService) {}

  @Post()
  async create(@Body() createUnavailableDto: CreateUnavailableDto) {
    return this.unavailableService.create(createUnavailableDto);
  }

  @Get()
  async findUnavailableTimeByArtist(
    @Param('artistId') artistId: string,
    @Param('date') date: string,
  ) {
    return this.unavailableService.findUnavailableTimeByArtist(
      artistId,
      new Date(date),
    );
  }

  @Delete(':artistId/:date/:time')
  async delete(
    @Param('artistId') artistId: string,
    @Param('date') date: string,
    @Param('time') time: string,
  ) {
    try {
      await this.unavailableService.deleteById(artistId, new Date(date), time);
    } catch (error) {
      throw new NotFoundException('Appointment not found');
    }
  }
}
