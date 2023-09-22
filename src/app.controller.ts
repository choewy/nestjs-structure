import { Controller, Get } from '@nestjs/common';

import { Public } from './persistence/constants';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('health')
  health(): boolean {
    return true;
  }
}
