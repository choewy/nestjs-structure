import axios, { Axios } from 'axios';
import { cookie } from './cookie';
import { SERVER } from '../configs';

export class UserApiClient {
  private readonly api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: `http://${SERVER}/users`,
    });
  }

  async getID() {
    const { data } = await this.api.get('/me', {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    });

    return data.data?.id as number;
  }
}

export const userApiClient = new UserApiClient();
