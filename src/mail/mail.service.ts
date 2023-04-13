import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(mailOptions: Record<string, any>): Promise<any> {
    return await this.mailerService.sendMail(mailOptions);
  }
}
