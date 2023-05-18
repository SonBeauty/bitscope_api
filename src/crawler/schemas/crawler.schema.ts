import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Crawler {
  @Prop()
  phone: string;

  @Prop()
  api_id: string;

  @Prop()
  api_hash: string;

  @Prop()
  group_name: string;

  @Prop()
  action: string;

  @Prop()
  status: string;

  @Prop({ type: Object })
  options: object;

  @Prop({ type: Object })
  data: object;
}

export const CrawlerSchema = SchemaFactory.createForClass(Crawler);
