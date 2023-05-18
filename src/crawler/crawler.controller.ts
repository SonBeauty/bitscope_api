import { Controller, Post, Body } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CreateCrawlerDto } from './dto/create-crawler.dto';

@Controller('api')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('/crawler')
  create(@Body() createCrawlerDto: CreateCrawlerDto) {
    return this.crawlerService.crawler(createCrawlerDto);
  }
}
