import { Controller, Post, Body, Sse } from '@nestjs/common';
import { UserTelegramService } from './user-telegram.service';
import { UserTelegramDto } from './dto/userTelegram.dto';
import { Observable } from 'rxjs';

@Controller('telegram')
export class UserTelegramController {
  constructor(private userTelegramServices: UserTelegramService) {}

  @Post('/user')
  @Sse('user/stream')
  async message(@Body() user: UserTelegramDto): Promise<Observable<any>> {
    const response = await this.userTelegramServices.getUser(user);
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
