import { AuthController } from '@app/module/auth/auth.controller';
import { AuthService } from '@app/module/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSourceName } from '@submodule/persistence';
import { DataSource } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: DataSource,
          useValue: { name: DataSourceName.MASTER },
        },
        {
          provide: DataSource,
          useValue: { name: DataSourceName.SLAVE },
        },
        {
          provide: 'SLAVE_UserRepository',
          useValue: {},
        },
        JwtService,
        AuthService,
      ],
    }).compile();

    authController = userModule.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('AuthController to be defined."', () => {
      expect(authController).toBeDefined();
    });
  });
});
