import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Phone {
  @Prop()
  status: string;

  @Prop()
  name: string;

  @Prop({ type: Object })
  data: {
    totalComment: number;
    countGoodComment: number;
    rating: string;
    specifications: {
      screen: string;
      cameraFront: string;
      cameraSelfie: string;
      ram: string;
      memory: string;
      cpu: string;
      battery: string;
      sim: string;
      os: string;
      origin: string;
      releaseTime: string;
    };
  };

  @Prop({ type: Object })
  overview: object;

  @Prop()
  createdBy: string;

  @Prop({ type: Object })
  specification: object;

  @Prop({ type: Object })
  aspect_senti: object;

  @Prop({ type: Object })
  percent_senti: object;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
