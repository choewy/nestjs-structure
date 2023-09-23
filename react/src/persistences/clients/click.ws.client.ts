import { Dispatch, SetStateAction } from 'react';

import { Manager, Socket } from 'socket.io-client';

import { Rank } from '../interfaces';
import { SERVER } from '../configs';

export class ClickWsClient extends Socket {
  constructor() {
    super(
      new Manager(`ws://${SERVER}`, {
        autoConnect: false,
        reconnection: true,
        transports: ['websocket'],
      }),
      '/click',
    );
  }

  public useOnException() {
    this.on('exception', console.warn);
  }

  public useOnRanks(setState: Dispatch<SetStateAction<Rank[]>>) {
    this.on('ranks', setState);
  }
}

export const clickWsClient = new ClickWsClient();
