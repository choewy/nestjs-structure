import { Controller, Get, Patch } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

import { JwtAuthPayload, Public, SignedUser } from '@app/persistence/constants';

import { ClickService } from './click.service';
import { ClickGateway } from './click.gateway';

@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService, private readonly clickGateway: ClickGateway) {}

  @Public()
  @Get()
  async getRankTop10() {
    return this.clickService.getRankTop10();
  }

  @SkipThrottle()
  @Patch()
  async increaseClickCount(@SignedUser() user: JwtAuthPayload) {
    const res = await this.clickService.increaseClickCount(user.id);

    await this.clickGateway.sendRanks();

    return res;
  }
}
