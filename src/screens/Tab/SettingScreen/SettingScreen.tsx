import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SettingScreen.scss';
import {Text, View} from 'react-native';
import type {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {atomicStyles} from 'src/styles';

/**
 * File: SettingScreen.tsx
 * @created 2022-01-06 00:24:25
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SettingScreenProps>>}
 */
const SettingScreen: FC<PropsWithChildren<SettingScreenProps>> = (
  props: PropsWithChildren<SettingScreenProps>,
): ReactElement => {
  const {} = props;

  const [translate] = useTranslation();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('Cài đặt')}
        isLeftIcon={false}
        contentScrollable={true}>
        <View style={styles.container}>
          <Text style={[atomicStyles.text, atomicStyles.textDark]}>Abc</Text>
        </View>
      </DefaultLayout>
    </>
  );
};

export interface SettingScreenProps extends StackScreenProps<any> {
  //
}

SettingScreen.defaultProps = {
  //
};

SettingScreen.propTypes = {
  //
};

SettingScreen.displayName = nameof(SettingScreen);

export default SettingScreen;
