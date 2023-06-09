import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Telegram {
  @Prop()
  objectId: string;

  @Prop()
  status: string;

  @Prop({ type: Object })
  profile: {
    objectId: string;
    name: string;
  };

  @Prop({ type: Object })
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
    percent: number;
  };

  @Prop({ type: Object })
  data: {
    dataMembers: [];
    dataAdmins: [];
    dataMessages: [];
    totalMembers: number;
    status: string;
  };

  @Prop({ type: Array })
  result: [
    {
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
    },
  ];
}

export const TelegramSchema = SchemaFactory.createForClass(Telegram);
