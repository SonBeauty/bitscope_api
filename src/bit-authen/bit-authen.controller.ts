import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { BitAuthenService } from './bit-authen.service';
import { BitauthenDto } from './dto/bit-authen.dto';

@Controller('bitAuthen')
export class BitAuthenController {
  constructor(private readonly bitAuthenService: BitAuthenService) {}
  @Post()
  async create(@Body() request: BitauthenDto) {
    return this.bitAuthenService.create(request);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.bitAuthenService.show(id);
  }
}
