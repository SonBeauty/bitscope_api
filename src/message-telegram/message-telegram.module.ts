import { Module } from '@nestjs/common';
import { MessageTelegramController } from './message-telegram.controller';
import { MessageTelegramService } from './message-telegram.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './schemas/request.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
  ],
  controllers: [MessageTelegramController],
  providers: [MessageTelegramService],
  exports: [MessageTelegramService],
})
export class MessageTelegramModule {}
