import { Module } from '@nestjs/common';
import { UnavailableService } from './unavailable.service';
import { UnavailableController } from './unavailable.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UnavailableController],
  providers: [UnavailableService, PrismaService],
})
export class UnavailableModule {}
