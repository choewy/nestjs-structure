import { Repository } from 'typeorm';

import { ClickCount, User } from '@submodule/entities';

export class UserQuery {
  public static async hasUserByName(repo: Repository<User>, name: string) {
    console.log(name);

    return !!(await repo.findOne({
      select: ['id', 'name'],
      where: { name },
    }));
  }

  public static async createUser(repo: Repository<User>, name: string) {
    const user = new User();

    user.name = name;
    user.clickCount = new ClickCount();

    await repo.save(user);
  }
}
