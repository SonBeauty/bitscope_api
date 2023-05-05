import { IsString } from 'class-validator';

export class UserTelegramDto {
  @IsString()
  api_id: string;

  @IsString()
  api_hash: string;

  @IsString()
  phone: string;

  @IsString()
  group_name: string;

  @IsString()
  action: string;
}
