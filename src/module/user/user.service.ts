import { Repository } from 'typeorm';

import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@submodule/entities';
import { DataSourceName } from '@submodule/persistence/enums';

import { ExceptionMessage } from '@app/persistence/constants';
import { ResponseDto } from '@app/dto/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, DataSourceName.SLAVE)
    private readonly userRepository: Repository<User>,
  ) {}

  async getProfile(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(ExceptionMessage.NOT_FOUND_USER);
    }

    return ResponseDto.success(HttpStatus.OK, {
      id: user.id,
      username: user.username,
      name: user.name,
    });
  }
}
