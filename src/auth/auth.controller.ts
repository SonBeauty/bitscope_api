import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { EmailForgotDto } from './dto/emailForgot.dto';
import { NewPasswordDto } from './dto/newPassword.dto';
import { JwtStrategy } from './jwt.strategy';
import { UpdateUserDto } from './dto/updateUser.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/active/:token')
  async activateAccount(@Param('token') token: string): Promise<string> {
    await this.authService.activateAccount(token);
    return 'ok';
  }

  @Post('/forgot')
  async forgot(@Body() email: EmailForgotDto): Promise<{ email: string }> {
    return this.authService.forgot(email);
  }

  @Put('/newPassword/:token')
  async newPassword(
    @Param('token') token: string,
    @Body() newPasswordDto: NewPasswordDto,
  ): Promise<{
    token: string;
    newPasswordDto: { password: string; confirmPassword: string };
  }> {
    return this.authService.newPassword(token, newPasswordDto);
  }

  @UseGuards(JwtStrategy)
  @Get('/')
  async show(@Req() req) {
    const user = await this.authService.show(req.headers.bearer);
    return user;
  }

  @UseGuards(JwtStrategy)
  @Put('/')
  async update(@Req() req, @Body() updateUser: UpdateUserDto) {
    const user = await this.authService.update(req.headers.bearer, updateUser);

    return user;
  }
}
