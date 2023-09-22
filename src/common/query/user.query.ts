import { DeepPartial, Repository } from 'typeorm';

import { Click, User } from '@submodule/entities';

export class UserQuery {
  public static async hasUserByName(repo: Repository<User>, username: string) {
    return !!(await repo.findOne({
      select: ['id', 'username'],
      where: { username },
    }));
  }

  public static async findUserById(repo: Repository<User>, id: number) {
    return repo.findOneBy({ id });
  }

  public static async findUserByName(repo: Repository<User>, username: string) {
    return repo.findOneBy({ username });
  }

  public static async createUser(repo: Repository<User>, user: DeepPartial<User>) {
    user.click = new Click();

    return repo.save(repo.create(user));
  }
}
