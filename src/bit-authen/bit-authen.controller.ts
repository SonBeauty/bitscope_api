import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { BitAuthenService } from './bit-authen.service';
import { phoneDto } from './dto/bit-authen.dto';

@Controller('bitAuthen')
export class BitAuthenController {
  constructor(private readonly bitAuthenService: BitAuthenService) {}

  @Post()
  async create(@Body() request: phoneDto) {
    return this.bitAuthenService.create(request);
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    return this.bitAuthenService.show(id);
  }
}
