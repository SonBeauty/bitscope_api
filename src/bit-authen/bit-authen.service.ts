import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Bitauthen } from './schemas/bit-authen.schema';
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
  ) {}

  async create(token, request: BitauthenDto) {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken ? decodedToken['id'] : null;
    if (!userId) {
      throw new UnauthorizedException('Forbidden');
    }
    const telegramLink = request.telegram.split('/');
    const twitterLink = '@' + request.twitter.split('/').pop();
    const lastPart = telegramLink[telegramLink.length - 1];
    const demand = await this.bitauthenModel.create({
      telegram: {
        objectId: request.telegram,
        status: '0',
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
      },
      twitter: {
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
        },
        data: {
          data: null,
          status: '0',
        },
        result: 0,
      },
      createdBy: userId,
    });

    const { _id } = demand._id;

    try {
      await axios.get(
        `${process.env.TWITTER}?userId=${demand.twitter.profile.name}&objectId=${_id}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '',
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
    return demand;
  }

  async show(id: string) {
    return this.bitauthenModel.findById(id).exec();
  }

  async index(token: string) {
    const decodedToken = jwt.decode(token);
    const userId = decodedToken ? decodedToken['id'] : null;

    return this.bitauthenModel.find({ createdBy: userId });
  }
}
