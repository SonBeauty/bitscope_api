import { IsString, IsObject } from 'class-validator';

export class MessageTelegramDto {
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

  @IsObject()
  options: {
    limit: number;
    offset_date: number;
  };
}
