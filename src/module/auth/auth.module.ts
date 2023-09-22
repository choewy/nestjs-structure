import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceName, User } from '@submodule/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User], DataSourceName.SLAVE)],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
