import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { ClickCount, DBConfig, User } from '@submodule/persistence';
import { JwtConfig } from './persistence/configs';
import { JwtAuthGuard, JwtAuthGuardStrategy } from './persistence/guards';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './module/user';
import { AuthModule } from './module/auth';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(new DBConfig('DB').getOptions([User, ClickCount])),
    JwtModule.register(new JwtConfig('JWT').getOptions()),
    ThrottlerModule.forRoot([{ ttl: 30000, limit: 10 }]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuardStrategy, JwtAuthGuard, ThrottlerGuard],
})
export class AppModule {}
