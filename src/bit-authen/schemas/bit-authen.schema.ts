import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Bitauthen {
  @Prop({ type: Object })
  telegram: {
    objectId: string;
    dataId: string;
  };

  @Prop({ type: Object })
  twitter: {
    objectId: string;
    dataId: string;
  };

  @Prop()
  createdBy: string;
}

export const BitauthenSchema = SchemaFactory.createForClass(Bitauthen);
