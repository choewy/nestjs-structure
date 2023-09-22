import { Repository } from 'typeorm';

import { ClickCount, User } from '@submodule/entities';

export class UserQuery {
  public static async hasUserByName(repo: Repository<User>, name: string) {
    return !!(await repo.findOne({
      select: ['id', 'name'],
      where: { name },
    }));
  }

  public static async findUserByName(repo: Repository<User>, name: string) {
    return repo.findOneBy({ name });
  }

  public static async findUserById(repo: Repository<User>, id: number) {
    return repo.findOneBy({ id });
  }

  public static async createUser(repo: Repository<User>, name: string) {
    const user = new User();

    user.name = name;
    user.clickCount = new ClickCount();

    return repo.save(user);
  }
}
