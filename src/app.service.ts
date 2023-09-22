import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getVersion(): string {
    return process.env.VERSION;
  }
}
