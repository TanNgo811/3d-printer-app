import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './ChangeServerScreen.scss';
import nameof from 'ts-nameof.macro';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {Text, View} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';
import {ANDROID} from 'src/config/const';
import {Button, Input} from 'src/components/atoms';
import {useServerUrlService} from 'src/services/server-url-service/use-server-url-service';
import LoadingComponent from 'src/components/atoms/LoadingComponent';

export function ChangeServerScreen(
  props: PropsWithChildren<ChangeServerScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  const [url, handleConfirmChange, handleChangeUrl, loading] =
    useServerUrlService();

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
            inputStyle={[
              atomicStyles.textDark,
              atomicStyles.text,
              styles.inputStyle,
            ]}
            onChange={handleChangeUrl}
            defaultValue={url}
            placeholderTextColor={Colors.Gray}
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

      <LoadingComponent loading={loading} />
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
