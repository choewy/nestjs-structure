import { Repository } from 'typeorm';

import { ClickCount } from '@submodule/entities';

export class ClickCountQuery {
  public static async increaseClickCountByUserId(repo: Repository<ClickCount>, userId: number) {
    await repo
      .createQueryBuilder()
      .update()
      .set({ count: () => 'count + 1' })
      .where({ userId })
      .execute();
  }
}
