import { WorkTimeStatus } from '@prisma/client';
import { IsString, IsDateString } from 'class-validator';

export class CreateDayOffDto {
  @IsString()
  artistId: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;
}

export class UpdateDayOffDto {
  @IsString()
  status?: WorkTimeStatus;
}
