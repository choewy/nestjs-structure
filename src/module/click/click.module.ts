import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Click } from '@submodule/entities';
import { DataSourceName } from '@submodule/persistence/enums';

import { ClickController } from './click.controller';
import { ClickService } from './click.service';
import { ClickGateway } from './click.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Click], DataSourceName.SLAVE)],
  controllers: [ClickController],
  providers: [ClickGateway, ClickService],
})
export class ClickModule {}
