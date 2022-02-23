import {Repository} from 'react3l-common';
import {httpConfig} from 'src/config/repository';
import type {Observable} from 'rxjs';
import {PRINTER_URL} from 'src/config/const';
import {COMMAND_ENDPOINT} from 'src/config/endpoint';

export class CommandRepository extends Repository {
  constructor() {
    super(httpConfig);
  }

  public readonly sendCommandText = (command?: string): Observable<any> => {
    const encodeCommand = encodeURI(command!);
    const params = `${PRINTER_URL}${COMMAND_ENDPOINT.COMMAND_TEXT}=${encodeCommand}&PAGEID=0`;
    return this.http
      .get<any>(params, {})
      .pipe(Repository.responseDataMapper<any>());
  };

  public readonly sendCommandPlain = (
    command?: string,
  ): Observable<boolean> => {
    const encodeCommand = encodeURI(command!);
    const params = `${PRINTER_URL}${COMMAND_ENDPOINT.PLAIN}=${encodeCommand}&PAGEID=0`;
    return this.http
      .get<boolean>(params, {})
      .pipe(Repository.responseDataMapper<boolean>());
  };

  public readonly sendCommandSilence = (
    command?: string,
  ): Observable<boolean> => {
    const encodeCommand = encodeURI(command!);
    const params = `${PRINTER_URL}${COMMAND_ENDPOINT.COMMAND_SILENCE}=${encodeCommand}&PAGEID=0`;
    return this.http
      .get<boolean>(params, {})
      .pipe(Repository.responseDataMapper<boolean>());
  };
}

export const commandRepository: CommandRepository = new CommandRepository();
