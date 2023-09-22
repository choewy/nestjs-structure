import { Repository } from 'typeorm';

import { Click } from '@submodule/entities';

export class ClickQuery {
  public static use(repo: Repository<Click>) {
    return new ClickQuery(repo);
  }

  constructor(private readonly repo: Repository<Click>) {}

  async findTop10OrderByCountDesc() {
    return this.repo.find({
      relations: { user: true },
      select: {
        userId: true,
        count: true,
        user: { username: true, name: true },
      },
      order: { count: 'DESC' },
      take: 10,
    });
  }

  async increaseClickCountByUserId(userId: number) {
    return this.repo
      .createQueryBuilder()
      .update()
      .set({ count: () => 'count + 1' })
      .where({ userId })
      .execute();
  }
}
