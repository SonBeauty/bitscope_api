import { IsString } from 'class-validator';

export class CreateCrawlerDto {
  @IsString()
  group_name: string;
}
