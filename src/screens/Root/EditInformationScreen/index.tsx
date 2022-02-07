import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './EditInformationScreen.scss';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {Text, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {ANDROID} from 'src/config/const';
import type {StackScreenProps} from '@react-navigation/stack';

export function EditInformationScreen(
  props: PropsWithChildren<EditInformationScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Thay đổi thông tin máy in')}
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

export interface EditInformationScreenProps extends StackScreenProps<any> {
  //
}

EditInformationScreen.defaultProps = {
  //
};

EditInformationScreen.displayName = nameof(EditInformationScreen);

export default EditInformationScreen;
