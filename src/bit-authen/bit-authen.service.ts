import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { Bitauthen } from './schemas/bit-authen.schema';
import { Telegram } from './schemas/telegram.schema';
import { Twitter } from './schemas/twitter.schema';
import { telegram } from '../constant/data';
import { BitauthenDto } from './dto/bit-authen.dto';

@Injectable()
export class BitAuthenService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Bitauthen.name)
    private bitauthenModel: Model<Bitauthen>,
    @InjectModel(Telegram.name)
    private telegramModel: Model<Telegram>,
    @InjectModel(Twitter.name)
    private twitterModel: Model<Twitter>,
  ) {}

  async create(token, request: BitauthenDto) {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken ? decodedToken['id'] : null;
    if (!userId) {
      throw new UnauthorizedException('Forbidden');
    }
    const telegramLink = request?.telegram && request?.telegram?.split('/');
    const twitterLink =
      request?.twitter && '@' + request?.twitter?.split('/')?.pop();
    const lastPart = telegramLink?.pop() || null;

    let newTelegram;

    if (request?.telegram?.length !== 0) {
      newTelegram = await this.telegramModel.create({
        objectId: request?.telegram,
        status: lastPart === undefined ? '-1' : '0',
        profile: {
          objectId: request?.telegram,
          name: lastPart,
        },
        ...telegram,
      });
    }

    const demand = await this.bitauthenModel.create({
      telegram:
        request?.telegram?.length === 0
          ? null
          : {
              objectId: lastPart,
              dataId: newTelegram?._id || null,
            },
      twitter:
        request?.twitter?.length === 0
          ? null
          : {
              objectId: twitterLink,
              dataId: '',
            },
      createdBy: userId,
    });

    if (twitterLink?.length > 1) {
      try {
        axios.get(
          `${process.env.TWITTER}/twitter/handle-crawl?objectId=${twitterLink}&_id=${demand._id}`,
          {
            headers: {
              'ngrok-skip-browser-warning': '',
            },
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
    return demand;
  }

  async show(id: string) {
    const response: any = {};

    const telegramId = await (
      await this.bitauthenModel.findById(id)
    )?.telegram?.dataId;
    if (telegramId) {
      const dataTele = await this.telegramModel
        .findById(telegramId)
        .select('-data')
        .exec();
      response.telegram = dataTele;
    }

    const twitterId = await (
      await this.bitauthenModel.findById(id)
    )?.twitter?.dataId;
    if (twitterId) {
      const dataTwit = await this.twitterModel
        .findById(twitterId)
        .select('-data')
        .exec();
      response.twitter = dataTwit;
    }
    return response;
  }

  async index(token: string) {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken ? decodedToken['id'] : null;

    return this.bitauthenModel.find({ createdBy: userId });
  }
}
