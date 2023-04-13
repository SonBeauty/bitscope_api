import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(MailService)
    private readonly mailService: MailService,
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

    const confirmationLink = `http://localhost:3000/auth/active/${token}`;

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
}
