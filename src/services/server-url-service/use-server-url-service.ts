import React from 'react';
import {server} from 'src/config/server';
import {useDispatch} from 'react-redux';
import {globalSlice} from 'src/store';
import {useNavigation} from '@react-navigation/native';
import {pingRepository} from 'src/repositories/ping-repository';
import {showError, showInfo} from 'src/helpers/toasty';
import {useTranslation} from 'react-i18next';
import {useBoolean} from 'react3l-common';
import {finalize} from 'rxjs';

export function useServerUrlService(): [
  string,
  () => void,
  (text: string) => void,
  boolean,
] {
  const [loading, , handleOnLoading, handleOffLoading] = useBoolean(false);

  const [translate] = useTranslation();

  const navigation = useNavigation();

  const [url, setUrl] = React.useState<string>(server.serverUrl);

  const dispatch = useDispatch();

  const {changeServerUrl} = globalSlice.actions;

  const handleChangeUrl = React.useCallback((text: string) => {
    setUrl(text.trim());
  }, []);

  const handleConfirmChange = React.useCallback(async () => {
    await handleOnLoading();

    await server.setServerUrl(url);

    await pingRepository
      .ping()
      .pipe(
        finalize(() => {
          handleOffLoading();
        }),
      )
      .subscribe({
        next: async () => {
          //
          await showInfo(translate('Đổi IP thành công'));

          await dispatch(changeServerUrl(url));

          await navigation.goBack();
        },
        error: () => {
          //
          showError('IP không tồn tại');
        },
      });
  }, [
    changeServerUrl,
    dispatch,
    handleOffLoading,
    handleOnLoading,
    navigation,
    translate,
    url,
  ]);

  return [url, handleConfirmChange, handleChangeUrl, loading];
}
