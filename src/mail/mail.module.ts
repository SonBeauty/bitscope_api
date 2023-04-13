import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_EMAIL, // replace with your email
          pass: process.env.SMTP_PASS, // replace with your password
        },
      },
      defaults: {
        from: 'your-email@example.com', // replace with your email
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
