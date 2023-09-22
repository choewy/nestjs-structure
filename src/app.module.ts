import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { Click, DBConfig, User } from '@submodule/persistence';
import { JwtConfig } from './persistence/configs';
import { JwtAuthGuard, JwtAuthGuardStrategy } from './persistence/guards';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(new DBConfig('DB').getOptions([User, Click])),
    JwtModule.register(new JwtConfig('JWT').getOptions()),
    ThrottlerModule.forRoot([{ ttl: 10000, limit: 30 }]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuardStrategy, JwtAuthGuard, ThrottlerGuard],
})
export class AppModule {}
