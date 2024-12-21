import { PartialType } from '@nestjs/swagger';
import { CreateTattooImageDto } from './create-tattoo-image.dto';

export class UpdateTattooImageDto extends PartialType(CreateTattooImageDto) {}
