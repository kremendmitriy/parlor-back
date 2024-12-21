import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateArtistWorkDto } from './dto/artist-work-dto';
import { UpdateArtistWorkDto } from './dto/artist-work-dto';
import { ArtistWorksService } from './artist-works.service';

@Controller('artist-works')
export class ArtistWorksController {
  constructor(private readonly artistWorkService: ArtistWorksService) {}

  @Post()
  create(@Body() createArtistWorkDto: CreateArtistWorkDto) {
    return this.artistWorkService.create(createArtistWorkDto);
  }

  @Get(':artistId')
  findAllByArtist(@Param('artistId') artistId: string) {
    return this.artistWorkService.findAllByArtist(artistId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistWorkService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistWorkDto: UpdateArtistWorkDto,
  ) {
    return this.artistWorkService.update(id, updateArtistWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistWorkService.remove(id);
  }
}
