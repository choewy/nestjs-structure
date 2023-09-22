import { Repository } from 'typeorm';

import { Click } from '@submodule/entities';

export class ClickQuery {
  public static of(repo: Repository<Click>) {
    return new ClickQuery(repo);
  }

  constructor(private readonly repo: Repository<Click>) {}

  async increaseClickCountByUserId(userId: number) {
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ count: () => 'count + 1' })
      .where({ userId })
      .execute();
  }
}
