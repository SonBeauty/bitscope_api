import { Module } from '@nestjs/common';
import { BitAuthenService } from './bit-authen.service';
import { BitAuthenController } from './bit-authen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneSchema } from './schemas/bit-authen.schema';
import { HttpModule } from '@nestjs/axios';
import { TelegramSchema } from './schemas/telegram.schema';
import { TwitterSchema } from './schemas/twitter.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'Phone', schema: PhoneSchema },
      { name: 'Telegram', schema: TelegramSchema },
      { name: 'Twitter', schema: TwitterSchema },
    ]),
  ],
  controllers: [BitAuthenController],
  providers: [BitAuthenService],
})
export class BitAuthenModule {}
