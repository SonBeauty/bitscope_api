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
    userName: string;
  };

  @Prop({ type: Object })
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
    lessTweets: number;
    highQualityPercentage: number;
    normalQualityPercentage: number;
    lowQualityPercentage: number;
    badQualityPercentage: number;
  };

  @Prop({ type: Object })
  data: {
    data: object;
    status: string;
  };

  @Prop({ type: Array })
  results: string[];
}

export const TwitterSchema = SchemaFactory.createForClass(Twitter);
