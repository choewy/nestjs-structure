import { Controller, Get, Patch } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

import { JwtAuthPayload, Public, SignedUser } from '@app/persistence/constants';

import { ClickService } from './click.service';

@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Public()
  @Get()
  async getRankTop10() {
    return this.clickService.getRankTop10();
  }

  @SkipThrottle()
  @Patch()
  async increaseClickCount(@SignedUser() user: JwtAuthPayload) {
    return this.clickService.increaseClickCount(user.id);
  }
}
