import { UserController } from '@app/module/user/user.controller';
import { UserService } from '@app/module/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSourceName } from '@submodule/persistence';
import { DataSource } from 'typeorm';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: DataSource,
          useValue: { name: DataSourceName.MASTER },
        },
        UserService,
      ],
    }).compile();

    userController = userModule.get<UserController>(UserController);
  });

  describe('root', () => {
    it('UserController to be defined."', () => {
      expect(userController).toBeDefined();
    });
  });
});
