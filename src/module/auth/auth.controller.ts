import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@app/persistence/constants';
import { SignUpDto, SignInDto } from '@app/dto/auth';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
