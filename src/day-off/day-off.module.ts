import { Module } from '@nestjs/common';
import { DayOffService } from './day-off.service';
import { DayOffController } from './day-off.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DayOffController],
  providers: [DayOffService, PrismaService],
})
export class DayOffModule {}
