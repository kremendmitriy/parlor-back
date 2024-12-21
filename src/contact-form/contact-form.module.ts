import { Module } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ContactFormController],
  providers: [ContactFormService, PrismaService],
})
export class ContactFormModule {}
