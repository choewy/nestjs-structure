import axios, { Axios } from 'axios';
import { SERVER } from '../configs';

export class AuthApiClient {
  private readonly api: Axios;

  constructor() {
    this.api = axios.create({
      baseURL: `http://${SERVER}/auth`,
    });
  }

  async signIn(userId: number) {
    const { data } = await this.api.post('/signin', {
      username: `username_${userId}`,
      password: `password_${userId}`,
    });

    return data.data.accessToken as string;
  }

  async signUp(userId: number) {
    const { data } = await this.api.post('/signup', {
      name: `name_${userId}`,
      username: `username_${userId}`,
      password: `password_${userId}`,
    });

    return data.data.accessToken as string;
  }
}

export const authApiClient = new AuthApiClient();
