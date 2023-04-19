import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get('/data')
  getData(): any {
    return this.authenticationService.generateFakeData();
  }

  @Get('/trafficData')
  getTrafficData(): any {
    return this.authenticationService.generateTrafficData();
  }

  @Get('/info')
  getInfo(): any {
    return this.authenticationService.generateFollow();
  }
}
