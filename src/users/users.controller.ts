import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/users.schema';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RoleGuard } from './middleware/jwt.roleGuard';
import { Role } from './decorator/users.role';

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

  @UseGuards(RoleGuard)
  @Role('admin')
  @Delete('/:id')
  async softDelete(@Req() req, @Param('id') id: string): Promise<User | null> {
    const user = await this.userService.softDelete(req.headers.bearer, id);
    return user;
  }

  @UseGuards(RoleGuard)
  @Role('admin')
  @Put('/:id/restore')
  restoreUser(@Req() req, @Param('id') id: string): Promise<User> {
    return this.userService.restoreUser(req.headers.bearer, id);
  }
}
