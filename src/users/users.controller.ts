import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { User } from './entities/users.schema';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  index(): Promise<any> {
    return this.userService.index();
  }
  @Get('/:id')
  async show(@Param('id') id: string): Promise<User | null> {
    return this.userService.show(id);
  }
  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(id, updateUser);
  }
}
