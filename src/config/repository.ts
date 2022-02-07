import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Repository} from 'react3l-common';
import {showError} from 'src/helpers/toasty';
import {appCookie} from 'src/config/app-cookie';
import {translate} from 'react3l-localization';
import {PRINTER_URL} from 'src/config/const';

const ContentType = 'Content-Type';

export const httpConfig: AxiosRequestConfig = {
  baseURL: PRINTER_URL,
  headers: {
    [ContentType]: 'application/json',
  },
};

Repository.requestInterceptor = async (
  config: AxiosRequestConfig,
): Promise<AxiosRequestConfig> => {
  const token = await appCookie.getToken();

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  if (typeof config.data === 'object' && config.data !== null) {
    if (config.data instanceof FormData) {
      config.headers![ContentType] = 'multipart/form-data';
    }
  }
  return config;
};

Repository.responseInterceptor = async (
  response: AxiosResponse,
): Promise<AxiosResponse> => {
  return response;
};

Repository.errorInterceptor = async (error: AxiosError): Promise<void> => {
  switch (error?.response?.status) {
    /**
     * Error code 400
     *
     * We should handle it case by case (due to user input errors)
     *
     * So, the error simply be re-throw down
     */
    case 400:
      throw error;

    case 401:
      // await appStorage.removeUser();
      // store.dispatch(authenticationSlice.actions.removeUser());
      break;

    /**
     * Error code 403
     *
     * We should handle it case by case (due to user lacks of permissions)
     */
    case 403:
      throw error;

    case 420:
      /**
       * This error should only happen on debug mode
       */
      showError(translate('Có lỗi 420 xảy ra.'));
      throw error;

    case 500:
      throw error;

    case 502:
      throw error;
  }
  throw error;
};
