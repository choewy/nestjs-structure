import { DataSource } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Click } from '@submodule/entities';
import { ClickQuery } from '@app/common/query';
import { ResponseDto } from '@app/dto/response';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async increaseUserClickCount(id: number) {
    const clickRepository = this.dataSource.getRepository(Click);
    await ClickQuery.increaseClickCountByUserId(clickRepository, id);

    return ResponseDto.success(HttpStatus.OK, null);
  }
}
