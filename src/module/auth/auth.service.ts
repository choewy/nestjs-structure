import { DataSource, Repository } from 'typeorm';

import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@submodule/entities';
import { DataSourceName } from '@submodule/persistence/enums';
import { JwtConfig } from '@submodule/persistence/configs';

import { ConfigPrefix, ExceptionMessage, JwtAuthPayload } from '@app/persistence/constants';

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
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        username: user.username,
        name: user.name,
      } as JwtAuthPayload,
      new JwtConfig(ConfigPrefix.JWT).getSignOptions(),
    );

    return ResponseDto.success(HttpStatus.OK, { accessToken });
  }

  async signUp(dto: SignUpDto) {
    if (await UserQuery.use(this.userRepository).hasUserByName(dto.username)) {
      throw new BadRequestException(ExceptionMessage.ALREADY_EXIST_USER);
    }

    return this.issueTokens(
      await UserQuery.use(this.dataSource.getRepository(User)).createUser({
        username: dto.username,
        name: dto.name,
        password: hasingPassword(dto.password),
      }),
    );
  }

  async signIn(dto: SignInDto) {
    const user = await UserQuery.use(this.userRepository).findUserByName(dto.username);

    if (user == null) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    if (!comparePassword(user.password, dto.password)) {
      throw new UnauthorizedException(ExceptionMessage.UNAUTHORIZED);
    }

    return this.issueTokens(user);
  }
}
