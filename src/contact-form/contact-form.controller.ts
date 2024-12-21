import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { FormStatus } from '@prisma/client';

@Controller('contact-form')
export class ContactFormController {
  constructor(private readonly сontactFormService: ContactFormService) {}

  @Get()
  async getForms(@Query('status') status?: string) {
    if (status) {
      return this.сontactFormService.getFormsByStatus(status as FormStatus);
    }
    return this.сontactFormService.getAllContactForms();
  }

  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: FormStatus,
  ) {
    return this.сontactFormService.updateFormStatus(id, status);
  }

  @Post('send')
  async sendForm(@Body() createContactFormDto: CreateContactFormDto) {
    const result =
      await this.сontactFormService.sendContactForm(createContactFormDto);
    return { message: result };
  }

  @Delete('delete/:id')
  async deleteForm(@Param('id') id: string) {
    const result = await this.сontactFormService.deleteContactForm(id);
    return { message: result };
  }
}
