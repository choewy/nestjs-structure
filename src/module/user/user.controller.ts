import { Controller, Patch } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthPayload, SignedUser } from '@app/persistence/constants';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SkipThrottle()
  @Patch('click')
  async increaseUserClickCount(@SignedUser() user: JwtAuthPayload) {
    return this.userService.increaseUserClickCount(user.id);
  }
}
