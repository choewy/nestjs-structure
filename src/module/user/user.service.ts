import { DataSource } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { ClickQuery } from '@app/common/query';
import { ResponseDto } from '@app/dto/response';
import { Click } from '@submodule/entities';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async increaseUserClickCount(id: number) {
    await ClickQuery.of(this.dataSource.getRepository(Click)).increaseClickCountByUserId(id);

    return ResponseDto.success(HttpStatus.OK, null);
  }
}
