import { Repository } from 'typeorm';

import { Click } from '@submodule/entities';

export class ClickQuery {
  public static async increaseClickCountByUserId(repo: Repository<Click>, userId: number) {
    await repo
      .createQueryBuilder()
      .update()
      .set({ count: () => 'count + 1' })
      .where({ userId })
      .execute();
  }
}
