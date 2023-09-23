import { Namespace, Socket } from 'socket.io';

import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ClickService } from './click.service';

@WebSocketGateway({ namespace: 'click' })
export class ClickGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly clickService: ClickService) {}

  @WebSocketServer()
  private readonly nsp: Namespace;

  async handleConnection(client: Socket) {
    console.log(`connected : ${client.id}`);

    await this.sendRanks(client);
  }

  async handleDisconnect(client: Socket) {
    console.log(`disconnected : ${client.id}`);
  }

  async sendRanks(client?: Socket) {
    const event = 'ranks';
    const ranks = await this.clickService.getRankTop10();

    if (client) {
      client.emit(event, ranks.data);
    } else {
      this.nsp.emit(event, ranks.data);
    }
  }
}
