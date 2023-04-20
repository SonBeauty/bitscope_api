import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserListDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  readonly isActive: boolean;
}
