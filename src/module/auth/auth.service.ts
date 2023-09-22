import { DataSource } from 'typeorm';
import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@submodule/entities';
import { ExceptionMessage, JwtAuthPayload } from '@app/persistence/constants';

import { UserQuery } from '@app/common/query';
import { SignUpDto, SignInDto } from '@app/dto/auth';
import { ResponseDto } from '@app/dto/response';
import { JwtConfig } from '@app/persistence/configs';

@Injectable()
export class AuthService {
  constructor(private readonly dataSource: DataSource, private readonly jwtService: JwtService) {}

  private issueTokens(user: User) {
    const jwtOptions = new JwtConfig('JWT').getOptions();
    const secret = jwtOptions.secret;
    const signOptions = jwtOptions.signOptions;

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
      } as JwtAuthPayload,
      { secret, ...signOptions },
    );

    return ResponseDto.success(HttpStatus.OK, { accessToken });
  }

  async signUp(dto: SignUpDto) {
    const userRepository = this.dataSource.getRepository(User);

    if (await UserQuery.hasUserByName(userRepository, dto.name)) {
      throw new BadRequestException(ExceptionMessage.ALREADY_EXIST_USER);
    }

    return this.issueTokens(await UserQuery.createUser(userRepository, dto.name));
  }

  async signIn(dto: SignInDto) {
    const user = await UserQuery.findUserByName(this.dataSource.getRepository(User), dto.name);

    if (user == null) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    return this.issueTokens(user);
  }
}
