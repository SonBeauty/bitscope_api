import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserTelegram } from './schemas/userTelegram.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserTelegramService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(UserTelegram.name)
    private userTelegramModel: Model<UserTelegram>,
  ) {}

  async getUser(user): Promise<any> {
    try {
      const { phone, api_hash, group_name, action, api_id } = user;

      const request = await this.userTelegramModel
        .findOne({
          phone,
          api_hash,
          api_id,
          group_name,
          action,
        })
        .exec();

      if (!request) {
        await this.userTelegramModel.create({
          phone,
          api_hash,
          api_id,
          group_name,
          action,
          status: '0',
          data: null,
        });

        const { data } = await this.httpService
          .post<any>(`${process.env.CRAWLER}`, user)
          .toPromise();

        if (data) {
          await this.userTelegramModel.updateOne(
            { phone, api_hash, api_id, group_name, action },
            { status: '2', data },
          );

          return { data: data, status: '2' };
        } else return request;
      } else return request;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.FOUND);
    }
  }
}
