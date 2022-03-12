import {Repository} from 'react3l-common';
import {httpConfig} from 'src/config/repository';
import type {Observable} from 'rxjs';
import {server} from 'src/config/server';

export class PingRepository extends Repository {
  constructor() {
    super(httpConfig);
  }

  public readonly ping = (): Observable<any> => {
    const params = `${server.serverUrl}`;
    return this.http
      .get<any>(params, {})
      .pipe(Repository.responseDataMapper<any>());
  };
}

export const pingRepository: PingRepository = new PingRepository();
