import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class UserTelegram {
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
  data: object;
}

export const UserTelegramSchema = SchemaFactory.createForClass(UserTelegram);
