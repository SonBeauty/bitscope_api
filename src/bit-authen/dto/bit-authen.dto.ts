import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class BitauthenDto {
  @Prop()
  twitter: string;

  @Prop()
  telegram: string;
}
