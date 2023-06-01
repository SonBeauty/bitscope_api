import { Body, Controller, Post, Get, Param, Headers } from '@nestjs/common';
import { BitAuthenService } from './bit-authen.service';
import { BitauthenDto } from './dto/bit-authen.dto';

@Controller('bitAuthen')
export class BitAuthenController {
  constructor(private readonly bitAuthenService: BitAuthenService) {}
  @Post()
  async create(
    @Headers('Authorization') token: string,
    @Body() request: BitauthenDto,
  ) {
    return this.bitAuthenService.create(token, request);
  }
  @Get()
  async index(@Headers('Authorization') token: string) {
    return this.bitAuthenService.index(token);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.bitAuthenService.show(id);
  }
}
