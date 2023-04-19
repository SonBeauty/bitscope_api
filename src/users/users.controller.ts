import { Body, Controller, Get, Post, Param, Put } from '@nestjs/common';
import { User } from './entities/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  index(): Promise<any> {
    return this.userService.index();
  }
}
