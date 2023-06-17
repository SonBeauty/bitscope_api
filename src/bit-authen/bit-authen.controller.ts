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
import { phoneDto } from './dto/bit-authen.dto';
import { BaseResponse } from 'src/utils/utils.response';

@Controller('bitAuthen')
export class BitAuthenController {
  constructor(private readonly bitAuthenService: BitAuthenService) {}

  @Post()
  async create(
    @Headers('Authorization') token: string,
    @Body() request: phoneDto,
  ) {
    return this.bitAuthenService.create(request);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.bitAuthenService.show(id);
  }
}
