import { DataSource } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { ClickCount } from '@submodule/entities';

import { ClickCountQuery } from '@app/common/query';
import { ResponseDto } from '@app/dto/response';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async increaseUserClickCount(id: number) {
    const clickCountRepository = this.dataSource.getRepository(ClickCount);
    await ClickCountQuery.increaseClickCountByUserId(clickCountRepository, id);

    return ResponseDto.success(HttpStatus.OK, null);
  }
}
