import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FormStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContactFormService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllContactForms() {
    return this.prisma.formData.findMany();
  }

  async sendContactForm(createContactFormDto: CreateContactFormDto) {
    const { name, email, phone, message } = createContactFormDto;
    await this.prisma.formData.create({
      data: {
        name,
        email,
        phone,
        message,
        status: 'new',
      },
    });
    return 'Contact form sent successfully';
  }

  async getFormsByStatus(status: FormStatus) {
    return this.prisma.formData.findMany({
      where: { status },
    });
  }

  async updateFormStatus(id: string, status: FormStatus) {
    return this.prisma.formData.update({
      where: { id },
      data: { status },
    });
  }

  async deleteContactForm(id: string) {
    const form = await this.prisma.formData.findUnique({ where: { id } });

    if (!form) {
      throw new NotFoundException('Contact form not found');
    }

    await this.prisma.formData.delete({ where: { id } });
    return 'Contact form deleted successfully';
  }
}
