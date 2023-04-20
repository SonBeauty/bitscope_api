import { IsEmail, IsString } from 'class-validator';

export class FindUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
