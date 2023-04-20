import {
  Injectable,
  UnauthorizedException,
  Inject,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { EmailForgotDto } from './dto/emailForgot.dto';
import { NewPasswordDto } from './dto/newPassword.dto';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(MailService)
    private readonly mailService: MailService,
    private strategyService: JwtStrategy,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ token: string; userInfo: unknown }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isActive: false,
    });

    const token = this.jwtService.sign({ id: user._id });

    const confirmationLink = `${process.env.SRC}/auth/active/${token}`;

    const mailOptions = {
      to: email,
      subject: 'Confirm Your Email',
      text: `Please click on the following link to confirm your email: ${confirmationLink}`,
    };

    await this.mailService.send(mailOptions);

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    return { userInfo, token };
  }

  async activateAccount(token: string): Promise<boolean> {
    const decoded = this.jwtService.verify(token);

    const user = await this.userModel.findOne({ _id: decoded.id });

    if (!user) {
      return false;
    }

    await this.userModel.updateOne({ _id: decoded.id }, { isActive: true });

    return;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async forgot(
    emailForgotDto: EmailForgotDto,
  ): Promise<{ email: string; token: string }> {
    const { email } = emailForgotDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.jwtService.sign({ id: user._id });

    const resetPassword = `${process.env.SRC}/auth/newPassword/${token}`;

    const mailOptions = {
      to: email,
      subject: 'Password Reset Request',
      text: `Please click on the following link to Reset password: ${resetPassword}`,
    };

    await this.mailService.send(mailOptions);
    throw new HttpException('email send', HttpStatus.OK);
  }

  async newPassword(
    token: string,
    newPasswordDto: NewPasswordDto,
  ): Promise<{ token: string; newPasswordDto: NewPasswordDto }> {
    const { password, confirmPassword } = newPasswordDto;

    const decoded = this.jwtService.verify(token);

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const userUpdate = await this.userModel.updateOne(
      { _id: decoded.id },
      { password },
    );

    if (!userUpdate) {
      throw new NotFoundException('User not found');
    }

    throw new HttpException('password change', HttpStatus.OK);
  }

  async show(token: string): Promise<User> {
    const user = await this.userModel
      .findOne({ token }, { password: 0 })
      .exec();
    if (user) {
      return user;
    } else {
      throw new HttpException(
        'Token Wrong Or Dont Have User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(token: string, updateData: UpdateUserDto): Promise<User> {
    const decoded = this.jwtService.verify(token);

    const updatedUser = await this.userModel
      .findByIdAndUpdate(decoded.id, updateData, { new: true })
      .select('-password')
      .exec();

    if (!updatedUser) {
      throw new HttpException('Token wrong ', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return updatedUser;
  }
}
