import { DataSource, Repository } from 'typeorm';

import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Click } from '@submodule/entities';
import { DataSourceName } from '@submodule/persistence/enums';

import { ClickQuery } from '@app/common/query';
import { ResponseDto } from '@app/dto/response';
import { ExceptionMessage } from '@app/persistence/constants';

@Injectable()
export class ClickService {
  constructor(
    @InjectRepository(Click, DataSourceName.SLAVE)
    private readonly clickRepository: Repository<Click>,
    private readonly dataSource: DataSource,
  ) {}

  async getRankTop10() {
    return ResponseDto.success(HttpStatus.OK, await ClickQuery.use(this.clickRepository).findTop10OrderByCountDesc());
  }

  async increaseClickCount(userId: number) {
    const { affected } = await ClickQuery.use(this.dataSource.getRepository(Click)).increaseClickCountByUserId(userId);

    if (affected < 1) {
      throw new NotFoundException(ExceptionMessage.NOT_FOUND_USER);
    }

    return ResponseDto.success(HttpStatus.OK, null);
  }
}
