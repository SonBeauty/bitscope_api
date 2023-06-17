import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import { Phone } from './schemas/bit-authen.schema';

import { phoneDto } from './dto/bit-authen.dto';

@Injectable()
export class BitAuthenService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Phone.name)
    private phoneModel: Model<Phone>,
  ) {}

  async create(request: phoneDto) {
    const newPhone = await this.phoneModel.create({
      name: request.phone,
      status: '0',
      data: null,
      overview: null,
    });
    return newPhone._id;
  }

  async show(id) {
    const phone = await this.phoneModel.findById(id);
    return phone;
  }
}
