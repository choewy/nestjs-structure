import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClickCount, DBConfig, User } from '@submodule/persistence';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './module/user';

@Module({
  imports: [TypeOrmModule.forRoot(new DBConfig('DB').getOptions([User, ClickCount])), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
