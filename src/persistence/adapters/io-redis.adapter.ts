import { Server, ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';

import { RedisClient } from '@app/common/utils';

export class IoRedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  constructor(private readonly app: INestApplication) {
    super(app);
  }

  async connect() {
    const pubClient = new RedisClient();
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);

    return this;
  }

  public createIOServer(port: number, options?: ServerOptions) {
    options.pingTimeout = 3000;
    options.pingInterval = 15000;
    options.transports = ['websocket'];

    const server = super.createIOServer(port, options);

    server.adapter(this.adapterConstructor);

    return server as Server;
  }
}
