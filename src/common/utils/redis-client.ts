import IoRedis from 'ioredis';

import { RedisConfig } from '@submodule/persistence/configs';

import { ConfigPrefix } from '@app/persistence/constants';

export class RedisClient extends IoRedis {
  constructor() {
    super(new RedisConfig(ConfigPrefix.REDIS).getOptions());
  }
}
