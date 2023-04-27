import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as MongooseDelete from 'mongoose-delete';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Up'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  isActive: boolean;
}

const _UserSchema = SchemaFactory.createForClass(User);

_UserSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

export const UserSchema = _UserSchema;
