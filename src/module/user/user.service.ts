import { DataSource } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from '@submodule/entities';

import { UserQuery } from '@app/common/query';
import { CreateUserDto } from '@app/dto/user';
import { ResponseDto } from '@app/dto/response';
import { ExceptionMessage } from '@app/persistence';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async createUser(dto: CreateUserDto) {
    const userRepository = this.dataSource.getRepository(User);

    if (await UserQuery.hasUserByName(userRepository, dto.name)) {
      throw new HttpException(
        ResponseDto.failed(HttpStatus.BAD_REQUEST, ExceptionMessage.ALREADY_EXIST_USER),
        HttpStatus.BAD_REQUEST,
      );
    }

    await UserQuery.createUser(userRepository, dto.name);

    return ResponseDto.success(HttpStatus.CREATED, null);
  }
}
