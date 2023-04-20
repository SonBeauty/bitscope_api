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
    return users;
  }

  async show(id: string): Promise<User | null> {
    const data = await this.userModel.findById(id).select('-password').exec();

    if (data) {
      return data;
    } else {
      throw new HttpException(
        'Call id wrong ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
