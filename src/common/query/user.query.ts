import { DeepPartial, Repository } from 'typeorm';

import { Click, User } from '@submodule/entities';

export class UserQuery {
  public static use(repo: Repository<User>) {
    return new UserQuery(repo);
  }

  constructor(private readonly repo: Repository<User>) {}

  async hasUserByName(username: string) {
    return !!(await this.repo.findOne({
      select: ['id', 'username'],
      where: { username },
    }));
  }

  async findUserById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findUserByName(username: string) {
    return this.repo.findOneBy({ username });
  }

  async createUser(user: DeepPartial<User>) {
    user.click = new Click();

    return this.repo.save(this.repo.create(user));
  }
}
