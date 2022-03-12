import {Repository} from 'react3l-common';
import {httpConfig} from 'src/config/repository';
import {COMMAND_ENDPOINT} from 'src/config/endpoint';
import type {DocumentPickerResponse} from 'react-native-document-picker';
import type {Observable} from 'rxjs';
import {server} from 'src/config/server';

export class UploadRepository extends Repository {
  constructor() {
    super(httpConfig);
  }

  public readonly uploadFile = (
    file: DocumentPickerResponse,
    onUploadProgress?: (progressEvent: any) => void,
  ): Observable<any> => {
    const params = `${server.serverUrl}${COMMAND_ENDPOINT.UPLOAD_SERIAL}`;

    const formData = new FormData();

    formData.append('path', file?.uri);

    const arg = file?.uri + file?.name + 'S';

    formData.append(arg, file?.size);

    formData.append('myfile[]', file);

    const config = {onUploadProgress: onUploadProgress};

    return this.http
      .post<any>(params, formData, config)
      .pipe(Repository.responseDataMapper<any>());
  };
}

export const uploadRepository: UploadRepository = new UploadRepository();
