import { IsString, Matches } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
    message:
      'Password should contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long',
  })
  password: string;

  @IsString()
  confirmPassword: string;
}
