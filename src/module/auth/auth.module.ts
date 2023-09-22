import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '@submodule/entities';
import { DataSourceName } from '@submodule/persistence';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User], DataSourceName.SLAVE)],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
