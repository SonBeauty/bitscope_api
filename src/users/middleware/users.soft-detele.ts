import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISoftDeletedDocument } from 'mongoose-delete';

@Injectable()
export class SoftDeleteMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('User') private userModel: Model<ISoftDeletedDocument>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const userToDelete = await this.userModel.findById(userId);

    if (!userToDelete) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Soft-delete the user by setting the `deleted` field to `true`
    userToDelete.deleted = true;
    await userToDelete.save();

    return res.status(200).send({ message: 'User deleted successfully' });
  }
}
