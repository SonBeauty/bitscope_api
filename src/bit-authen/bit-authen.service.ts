import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bitauthen } from './schemas/bit-authen.schema';
import { Telegram } from './schemas/telegram.schema';
import { Twitter } from './schemas/twitter.schema';
import { Model } from 'mongoose';
import { BitauthenDto } from './dto/bit-authen.dto';
import { HttpService } from '@nestjs/axios';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

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
    const telegramLink = request.telegram && request.telegram.split('/');
    const twitterLink =
      request.twitter && '@' + request.twitter.split('/').pop();
    const lastPart = telegramLink[telegramLink.length - 1];

    let newTelegram;
    let newTwitter;

    if (request.telegram.length !== 0) {
      newTelegram = await this.telegramModel.create({
        objectId: request.telegram,
        status: lastPart === undefined ? '-1' : '0',
        profile: {
          objectId: request.telegram,
          name: lastPart,
        },
        overview: {
          review: {
            active: 0,
            normal: 0,
            low: 0,
            bot: 0,
          },
          activeReview: {
            active: '0',
            normal: '0',
            low: '0',
            bot: '0',
          },
          avg: {
            goodProfile: 0,
            avgActiveMember: 0,
            postimeFrans: '0',
            avgMess: 0,
          },
          activitiesOfTheWeek: {
            percentUser: {
              monday: 0,
              tuesday: 0,
              wednesday: 0,
              thursday: 0,
              friday: 0,
              saturday: 0,
              sunday: 0,
            },
          },
          hourOfOperation: {
            hour: null,
          },
          general: {
            numberOfSample: 0,
            numberOfConversation: 0,
            numberOfAdmin: 0,
          },
          ranking: null,
        },
        data: {
          dataMembers: [],
          dataAdmins: [],
          dataMessages: [],
          totalMembers: 0,
          status: '0',
        },
        result: {
          review: {
            active: 0,
            normal: 0,
            low: 0,
            bot: 0,
          },
          activeReview: {
            active: '0',
            normal: '0',
            low: '0',
            bot: '0',
          },
          avg: {
            goodProfile: 0,
            avgActiveMember: 0,
            postimeFrans: '0',
            avgMess: 0,
          },
          activitiesOfTheWeek: {
            percentUser: {
              monday: 0,
              tuesday: 0,
              wednesday: 0,
              thursday: 0,
              friday: 0,
              saturday: 0,
              sunday: 0,
            },
          },
          hourOfOperation: {
            hour: null,
          },
          general: {
            numberOfSample: 0,
            numberOfConversation: 0,
            numberOfAdmin: 0,
          },
          ranking: null,
          percent: 0,
        },
      });
    }

    if (request.twitter.length !== 0) {
      newTwitter = await this.twitterModel.create({
        objectId: request.twitter,
        status: '0',
        profile: {
          objectId: request.twitter,
          name: twitterLink,
          avatar: null,
          joinedData: null,
          tweet: 0,
          like: 0,
          follower: 0,
          following: 0,
          link: null,
          bio: null,
          location: null,
          category: null,
          nearAction: null,
          lastTweet: null,
          userName: null,
        },
        overview: {
          hightQuality: 0,
          normalQuality: 0,
          lowQuality: 0,
          badQuality: 0,
          regularActivity: 0,
          profileAvatar: 0,
          followerSpread: 0,
          tweetRatio: 0,
          filledInBios: 0,
          bubblesSpread: 0,
          locationVerifycation: 0,
          followersWithURL: 0,
          lessTweets: 0,
          highQualityPercentage: 0,
          normalQualityPercentage: 0,
          lowQualityPercentage: 0,
          badQualityPercentage: 0,
        },
        data: {
          data: null,
          status: '0',
          processBar: 0,
        },
        results: [0],
      });
    }

    const demand = await this.bitauthenModel.create({
      telegram:
        request.telegram.length === 0
          ? null
          : {
              objectId: lastPart,
              dataId: newTelegram ? newTelegram._id : null,
            },
      twitter:
        request.twitter.length === 0
          ? null
          : {
              objectId: twitterLink,
              dataId: newTwitter ? newTwitter._id : null,
            },
      createdBy: userId,
    });

    if (twitterLink.length > 1) {
      try {
        axios.get(`${process.env.TWITTER}?objectId=${twitterLink}`, {
          headers: {
            'ngrok-skip-browser-warning': '',
          },
        });
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
