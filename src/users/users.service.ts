import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async index(): Promise<User[]> {
    const users = await this.userModel.find({}, { password: 0 }).exec();
    if (users) {
      return users;
    } else {
      throw new HttpException(
        'Call users wrong ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
