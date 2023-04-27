import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/users.schema';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<User>,
    private jwtService: JwtService,
  ) {}

  async index(): Promise<User[]> {
    const users = await this.userModel.find({}, { password: 0 }).exec();

    if (!users) {
      throw new HttpException(
        'Call id wrong ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return users;
  }

  async show(id: string): Promise<User | null> {
    const data = await this.userModel.findById(id).select('-password').exec();

    if (!data) {
      throw new HttpException(
        'Call id wrong ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return data;
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUser, { new: true })
      .exec();

    if (!updatedUser) {
      throw new HttpException(
        'Call id wrong ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return updatedUser;
  }

  async softDelete(token: string, id: string): Promise<any> {
    const decoded = this.jwtService.verify(token);
    const userToDelete = await this.userModel.findById(id);
    const userPermission = await this.userModel.findById(decoded.id);

    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }

    if (userPermission.role !== 'admin' && userPermission.id !== id) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const deletedUser = await this.userModel.deleteById(id);
    return deletedUser;
  }

  async restoreUser(token: string, id: string): Promise<User> {
    const decoded = this.jwtService.verify(token);
    const userPermission = await this.userModel.findById(decoded.id);

    const userToRestore = await this.userModel.findOneWithDeleted({ _id: id });

    if (userPermission.role !== 'admin') {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
    if (!userToRestore) {
      throw new HttpException(
        'Call id wrong ',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const restoreUser = await this.userModel.restore(userToRestore);
    return restoreUser;
  }
}
