import { Module } from '@nestjs/common';
import { BitAuthenService } from './bit-authen.service';
import { BitAuthenController } from './bit-authen.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BitauthenSchema } from './schemas/bit-authen.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bitauthen', schema: BitauthenSchema }]),
  ],
  controllers: [BitAuthenController],
  providers: [BitAuthenService],
})
export class BitAuthenModule {}
