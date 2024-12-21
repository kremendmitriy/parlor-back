import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateUnavailableDto {
  @IsString()
  @IsNotEmpty()
  artistId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  reason: string;
}

export class DeleteUnavailableDto {
  @IsString()
  @IsNotEmpty()
  artistId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;
}
