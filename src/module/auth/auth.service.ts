import { DataSource } from 'typeorm';
import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@submodule/entities';
import { ExceptionMessage, JwtAuthPayload } from '@app/persistence/constants';
import { JwtConfig } from '@app/persistence/configs';
import { UserQuery } from '@app/common/query';
import { comparePassword, hasingPassword } from '@app/common/utils';
import { SignUpDto, SignInDto } from '@app/dto/auth';
import { ResponseDto } from '@app/dto/response';

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

    if (await UserQuery.hasUserByName(userRepository, dto.username)) {
      throw new BadRequestException(ExceptionMessage.ALREADY_EXIST_USER);
    }

    return this.issueTokens(
      await UserQuery.createUser(userRepository, {
        username: dto.username,
        name: dto.name,
        password: hasingPassword(dto.password),
      }),
    );
  }

  async signIn(dto: SignInDto) {
    const user = await UserQuery.findUserByName(this.dataSource.getRepository(User), dto.username);

    if (user == null) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    if (!comparePassword(user.password, dto.password)) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    return this.issueTokens(user);
  }
}
