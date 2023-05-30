import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MessageTelegramModule } from './message-telegram/message-telegram.module';
import { UserTelegramModule } from './user-telegram/user-telegram.module';
import { CrawlerModule } from './crawler/crawler.module';
import { BitAuthenModule } from './bit-authen/bit-authen.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: '',
        },
      },
    }),
    MailModule,
    AuthenticationModule,
    MessageTelegramModule,
    UserTelegramModule,
    CrawlerModule,
    BitAuthenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
