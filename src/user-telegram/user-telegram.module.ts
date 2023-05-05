import { Module } from '@nestjs/common';
import { UserTelegramController } from './user-telegram.controller';
import { UserTelegramService } from './user-telegram.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTelegramSchema } from './schemas/userTelegram.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'UserTelegram', schema: UserTelegramSchema },
    ]),
  ],
  controllers: [UserTelegramController],
  providers: [UserTelegramService],
  exports: [UserTelegramService],
})
export class UserTelegramModule {}
