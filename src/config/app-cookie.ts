import Cookies from '@react-native-cookies/cookies';
import moment from 'moment';
import nameof from 'ts-nameof.macro';
import {PRINTER_URL} from 'src/config/const';

export class AppCookie {
  public get refreshToken(): Promise<string> {
    return Cookies.get(PRINTER_URL).then(cookies => {
      return cookies[nameof(this.refreshToken)].value!;
    });
  }

  private get token(): Promise<string> {
    return Cookies.get(PRINTER_URL).then(cookies => {
      return cookies[nameof(this.token)].value!;
    });
  }

  public async getToken(): Promise<string> {
    const cookies = await Cookies.get(PRINTER_URL);
    if (Object.prototype.hasOwnProperty.call(cookies, nameof(this.token))) {
      return cookies[nameof(this.token)]?.value;
    }
    return '';
  }

  public async setToken(token: string): Promise<void> {
    await Cookies.set(PRINTER_URL, {
      name: nameof(this.token),
      value: token,
      expires: moment().add(12, 'hours').toISOString(),
    });
  }

  public async setRefreshToken(refreshToken: string): Promise<void> {
    await Cookies.set(PRINTER_URL, {
      name: nameof(this.refreshToken),
      value: refreshToken,
      expires: moment().add(1, 'year').toISOString(),
    });
  }

  public async removeAll(): Promise<void> {
    await Cookies.clearAll();
  }
}

export const appCookie: AppCookie = new AppCookie();
