import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthPayload, SignedUser } from '@app/persistence/constants';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMyProfile(@SignedUser() user: JwtAuthPayload) {
    return this.userService.getProfile(user.id);
  }
}
