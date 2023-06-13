import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Twitter {
  @Prop()
  objectId: string;

  @Prop()
  status: string;

  @Prop({ type: Object })
  profile: {
    objectId: string;
    name: string;
    userName: string;
    avatar: string;
    joinedData: string;
    tweet: number;
    like: number;
    follower: number;
    following: number;
    link: string;
    bio: string;
    location: string;
    category: string;
    nearAction: object;
    lastTweet: object;
  };

  @Prop({ type: Object })
  overview: {
    highQualityPercentage: number;
    highQuality: number;
    normalQualityPercentage: number;
    normalQuality: number;
    lowQualityPercentage: number;
    lowQuality: number;
    badQualityPercentage: number;
    badQuality: number;
    regularActivity: number;
    tweetRatio: number;
    followerRatio: number;
    profileAvatar: number;
    followersWithCategory: number;
    followersWithBios: number;
    locationInformation: number;
    followersWithURL: number;
    bubblesSpread: number;
    graphQuality: object;
  };

  @Prop({ type: Object })
  data: {
    data: object;
    status: string;
    processBar: number;
  };

  @Prop({ type: Array })
  results: string[];
}

export const TwitterSchema = SchemaFactory.createForClass(Twitter);
