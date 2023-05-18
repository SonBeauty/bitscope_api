import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerController } from './crawler.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlerSchema } from './schemas/crawler.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Crawler', schema: CrawlerSchema }]),
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
  exports: [CrawlerService],
})
export class CrawlerModule {}
