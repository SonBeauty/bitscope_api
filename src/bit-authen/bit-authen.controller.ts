import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Headers,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { BitAuthenService } from './bit-authen.service';
import { BitauthenDto } from './dto/bit-authen.dto';
import { BaseResponse } from 'src/utils/utils.response';

@Controller('bitAuthen')
export class BitAuthenController {
  constructor(private readonly bitAuthenService: BitAuthenService) {}

  @Get()
  async index(@Headers('Authorization') token: string, @Req() req, @Res() res) {
    const data = await this.bitAuthenService.index(req, token);
    return res.status(HttpStatus.OK).send(
      new BaseResponse({
        data: data,
        message: 'OK',
        status: HttpStatus.OK,
      }),
    );
  }

  @Post()
  async create(
    @Headers('Authorization') token: string,
    @Body() request: BitauthenDto,
  ) {
    return this.bitAuthenService.create(token, request);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.bitAuthenService.show(id);
  }
}
