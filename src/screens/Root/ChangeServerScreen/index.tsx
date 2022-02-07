import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './ChangeServerScreen.scss';
import nameof from 'ts-nameof.macro';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';
import {ANDROID} from 'src/config/const';
import {Button, Input} from 'src/components/atoms';
import {appSettingsSlice} from 'src/store/app-settings-slice';
import {store} from 'src/store';
import {server} from 'src/config/server';

export function ChangeServerScreen(
  props: PropsWithChildren<ChangeServerScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [url, setUrl] = React.useState<string>('');

  const handleChangeUrl = React.useCallback((text: string) => {
    setUrl(text.trim());
  }, []);

  const handleConfirmChange = React.useCallback(async () => {
    await server.setServerUrl(url);

    await store.dispatch(
      appSettingsSlice.actions.changeServerUrl(url.toLocaleLowerCase()),
    );

    navigation.goBack();
  }, [navigation, url]);

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Thay đổi IP')}
        isLeftIcon={true}
        contentScrollable={true}
        onLeftPress={navigation.goBack}>
        <View style={styles.container}>
          <Text
            style={[
              atomicStyles.bold,
              ANDROID && atomicStyles.androidBold,
              atomicStyles.textPrimary,
            ]}>
            {translate('Nhập địa chỉ IP của thiết bị')}
          </Text>

          <Input
            containerStyle={styles.inputContainer}
            placeholder={translate('Địa chỉ IP')}
            inputStyle={[atomicStyles.text, styles.inputStyle]}
            onChange={handleChangeUrl}
          />
        </View>
        <Button
          title={translate('Xác nhận')}
          onPress={handleConfirmChange}
          isOutlined={false}
          buttonContainerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
        />
      </DefaultLayout>
    </>
  );
}

export interface ChangeServerScreenProps extends StackScreenProps<any> {
  //
}

ChangeServerScreen.defaultProps = {
  //
};

ChangeServerScreen.displayName = nameof(ChangeServerScreen);

export default ChangeServerScreen;
