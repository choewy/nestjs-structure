import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { DBMasterConfig, DBSlaveConfig } from '@submodule/persistence';

import { JwtConfig } from './persistence/configs';
import { JwtAuthGuard, JwtAuthGuardStrategy } from './persistence/guards';
import { ConfigPrefix, entities } from './persistence/constants';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 10000, limit: 30 }]),
    JwtModule.register(new JwtConfig(ConfigPrefix.JWT).getOptions()),
    TypeOrmModule.forRoot(new DBMasterConfig(ConfigPrefix.DB_MASTER).getOptions(entities)),
    TypeOrmModule.forRoot(new DBSlaveConfig(ConfigPrefix.DB_SLAVE).getOptions(entities)),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuardStrategy, JwtAuthGuard, ThrottlerGuard],
})
export class AppModule {}
