import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.getOrThrow<string>('MAIL_HOST'),
      port: Number(this.config.get('MAIL_PORT') ?? 587),
      secure: this.config.get('MAIL_SECURE') === 'true',
      auth: {
        user: this.config.getOrThrow<string>('MAIL_USER'),
        pass: this.config.getOrThrow<string>('MAIL_PASS'),
      },
    });
  }

  async sendEnquiry(dto: CreateContactDto): Promise<void> {
    const to = this.config.getOrThrow<string>('MAIL_TO');
    const subject = dto.type
      ? `[Enquiry] ${dto.type} — ${dto.name}`
      : `[Enquiry] ${dto.name}`;

    try {
      await this.transporter.sendMail({
        from: `"${dto.name}" <${this.config.getOrThrow<string>('MAIL_USER')}>`,
        replyTo: dto.email,
        to,
        subject,
        text: `Name: ${dto.name}\nEmail: ${dto.email}\nType: ${dto.type || '—'}\n\n${dto.message}`,
        html: `
          <p><strong>Name:</strong> ${dto.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${dto.email}">${dto.email}</a></p>
          <p><strong>Type:</strong> ${dto.type || '—'}</p>
          <hr />
          <p>${dto.message.replace(/\n/g, '<br />')}</p>
        `,
      });
    } catch (err) {
      this.logger.error('Failed to send contact email', err);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
