import { WorkTimeStatus } from '@prisma/client';
import { IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  artistId: string;

  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  customerName: string;

  @IsString()
  customerPhone: string;

  @IsString()
  customerEmail: string;

  @IsEnum(WorkTimeStatus)
  status: WorkTimeStatus;
}
