import React from 'react';
import styles from './EditPrinterConfigurationScreen.scss';
import type {PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {ANDROID} from 'src/config/const';
import type {StackScreenProps} from '@react-navigation/stack';

export function EditPrinterConfigurationScreen(
  props: PropsWithChildren<EditPrinterConfigurationScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Thay đổi thông số chung')}
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
        </View>
      </DefaultLayout>
    </>
  );
}

export interface EditPrinterConfigurationScreenProps
  extends StackScreenProps<any> {
  //
}

EditPrinterConfigurationScreen.defaultProps = {
  //
};

EditPrinterConfigurationScreen.displayName = nameof(
  EditPrinterConfigurationScreen,
);

export default EditPrinterConfigurationScreen;
