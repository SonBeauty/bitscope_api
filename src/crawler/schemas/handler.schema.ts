import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Handler {
  @Prop()
  group_name: string;

  @Prop()
  status: string;

  @Prop({ type: Object })
  processed: object;

  @Prop()
  result: any[];
  date_end: string;
}

export const HandlerSchema = SchemaFactory.createForClass(Handler);
