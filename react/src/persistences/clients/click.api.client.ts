import axios, { Axios } from 'axios';

import { cookie } from './cookie';
import { SERVER } from '../configs';

export class ClickApiClient {
  private readonly api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: `http://${SERVER}/click`,
    });
  }

  async click() {
    await this.api.patch('', null, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    });
  }
}

export const clickApiClient = new ClickApiClient();
