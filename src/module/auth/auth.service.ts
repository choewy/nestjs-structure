import { DataSource, Repository } from 'typeorm';

import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSourceName, User } from '@submodule/entities';

import { ExceptionMessage, JwtAuthPayload } from '@app/persistence/constants';
import { JwtConfig } from '@app/persistence/configs';
import { UserQuery } from '@app/common/query';
import { comparePassword, hasingPassword } from '@app/common/utils';
import { SignUpDto, SignInDto } from '@app/dto/auth';
import { ResponseDto } from '@app/dto/response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, DataSourceName.SLAVE)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  private issueTokens(user: User) {
    const jwtOptions = new JwtConfig('JWT').getOptions();
    const secret = jwtOptions.secret;
    const signOptions = jwtOptions.signOptions;

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        username: user.username,
        name: user.name,
      } as JwtAuthPayload,
      { secret, ...signOptions },
    );

    return ResponseDto.success(HttpStatus.OK, { accessToken });
  }

  async signUp(dto: SignUpDto) {
    if (await UserQuery.of(this.userRepository).hasUserByName(dto.username)) {
      throw new BadRequestException(ExceptionMessage.ALREADY_EXIST_USER);
    }

    return this.issueTokens(
      await UserQuery.of(this.dataSource.getRepository(User)).createUser({
        username: dto.username,
        name: dto.name,
        password: hasingPassword(dto.password),
      }),
    );
  }

  async signIn(dto: SignInDto) {
    const user = await UserQuery.of(this.userRepository).findUserByName(dto.username);

    if (user == null) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    if (!comparePassword(user.password, dto.password)) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    return this.issueTokens(user);
  }
}
