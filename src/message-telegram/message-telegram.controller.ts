import { Controller, Post, Body, Sse } from '@nestjs/common';
import { MessageTelegramService } from './message-telegram.service';
import { MessageTelegramDto } from './dto/messageTelegram.dto';
import { Observable } from 'rxjs';

@Controller('telegram')
export class MessageTelegramController {
  constructor(private messageTelegramServices: MessageTelegramService) {}

  @Post('/message')
  @Sse('message/stream')
  async message(@Body() message: MessageTelegramDto): Promise<Observable<any>> {
    const response = await this.messageTelegramServices.getMessage(message);
    return new Observable<any>((observer) => {
      observer.next({
        data: JSON.stringify({ status: '0', message: 'processing' }),
      });
      observer.next({
        data: JSON.stringify({ response }),
      });
      observer.complete();
    });
  }
}
