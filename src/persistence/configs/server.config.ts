import { ListenOptions } from 'net';

export class ServerConfig {
  PORT = process.env.PORT;

  public getOptions(): ListenOptions {
    return {
      port: Number(this.PORT),
    };
  }
}
