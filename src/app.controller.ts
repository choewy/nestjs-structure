import { Controller, Get } from '@nestjs/common';

import { Public } from './persistence/constants';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  version() {
    return this.appService.getVersion();
  }

  @Public()
  @Get('health')
  health() {
    return;
  }
}
