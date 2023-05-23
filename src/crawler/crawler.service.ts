import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { Crawler } from './schemas/crawler.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { Handler } from './schemas/handler.schema';
@Injectable()
export class CrawlerService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Crawler.name)
    private crawlerModel: Model<Crawler>,
    @InjectModel(Handler.name)
    private handlerModel: Model<Handler>,
  ) {}
  async crawler(createCrawlerDto: CreateCrawlerDto): Promise<any> {
    const response = [];

    const postRequest = (params, status = 2) => ({
      request: {
        api_id: `${process.env.API_ID}`,
        api_hash: `${process.env.API_HASH}`,
        phone: `${process.env.PHONE}`,
        group_name: `${createCrawlerDto.group_name}`,
        ...params,
      },
      status,
    });

    const postRequests = [
      postRequest({
        action: 'scrape_members',
      }),
      postRequest({
        action: 'scrape_admins',
      }),
      postRequest({
        action: 'scrape_messages',
        options: {
          offset_date: 16,
        },
      }),
    ];

    let handler = null;
    let update = null;
    let iteration = 0;
    for (let i = 0; i < postRequests.length; i++) {
      try {
        const crawlerData = await this.crawlerModel.create(
          postRequests[i].request,
        );

        const { id } = crawlerData;

        const { data } = await this.httpService
          .post<any>(`${process.env.CRAWLER}`, postRequests[i].request)
          .toPromise();
        if (data) {
          await this.crawlerModel.updateOne(postRequests[i].request, {
            $set: { data, status: postRequests[i].status },
          });
          response.push({ data, status: postRequests[i].status });
        }

        const updateTime = await this.crawlerModel.findById(id).exec();
        if (!updateTime) {
          throw new Error('not found');
        }
        update = new Date(`${updateTime.updatedAt}`);
      } catch (error) {
        throw new HttpException('Not Found', HttpStatus.FOUND);
      }
    }
    while (!handler && iteration < 100) {
      handler = await this.handlerModel.find({
        group_name: `${createCrawlerDto.group_name}`,
        date_end: { $lte: `${update}` },
      });
      iteration++;

      if (!handler) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return handler;
  }
}
