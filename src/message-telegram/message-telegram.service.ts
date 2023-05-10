import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './schemas/request.schema';
import { MessageTelegramDto } from './dto/messageTelegram.dto';

@Injectable()
export class MessageTelegramService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Request.name)
    private requestModel: Model<Request>,
  ) {}

  async getMessage(message: MessageTelegramDto): Promise<any> {
    try {
      const request = await this.requestModel.findOne(message).exec();

      if (!request) {
        await this.requestModel.create(message);
        const { data } = await this.httpService
          .post<any>(`${process.env.CRAWLER}`, message)
          .toPromise();

        if (data) {
          await this.requestModel.updateOne(message, {
            $set: { data, status: '2' },
          });
          return { data, status: '2' };
        }
      }
      return request;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.FOUND);
    }
  }
}
