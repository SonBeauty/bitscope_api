import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailForgotDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}
