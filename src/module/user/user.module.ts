import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@submodule/entities';
import { DataSourceName } from '@submodule/persistence/enums';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], DataSourceName.SLAVE)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
