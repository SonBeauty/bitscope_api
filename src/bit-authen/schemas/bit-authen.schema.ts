import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Bitauthen {
  @Prop({ type: Object })
  telegram: {
    objectId: string;
    status: string;
    profile: {
      objectId: string;
      name: string;
    };
    overview: {
      review: {
        active: number;
        normal: number;
        low: number;
        bot: number;
      };
      activeReview: {
        active: string;
        normal: string;
        low: string;
        bot: string;
      };
      avg: {
        goodProfile: number;
        avgActiveMember: number;
        postimeFrans: string;
        avgMess: number;
      };
      activitiesOfTheWeek: {
        percentUser: {
          monday: number;
          tuesday: number;
          wednesday: number;
          thursday: number;
          friday: number;
          saturday: number;
          sunday: number;
        };
      };
      hourOfOperation: {
        hour: object;
      };
      general: {
        numberOfSample: number;
        numberOfConversation: number;
        numberOfAdmin: number;
      };
      ranking: object;
    };
    data: {
      data: object;
      status: string;
    };
    result: object;
  };

  @Prop({ type: Object })
  twitter: {
    objectId: string;
    status: string;
    profile: {
      objectId: string;
      name: string;
      avatar: string;
      joinedData: string;
      tweet: number;
      like: number;
      follower: number;
      following: number;
    };
    overview: {
      hightQuality: number;
      normalQuality: number;
      lowQuality: number;
      badQuality: number;
      regularActivity: number;
      profileAvatar: number;
      followerSpread: number;
      tweetRatio: number;
      filledInBios: number;
      bubblesSpread: number;
      locationVerifycation: number;
      followersWithURL: number;
    };
    data: {
      data: object;
      status: string;
    };
    result: object;
  };
}

export const BitauthenSchema = SchemaFactory.createForClass(Bitauthen);
