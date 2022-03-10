import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import styles from './GeneralSettingScreen.scss';
import nameof from 'ts-nameof.macro';
import {View} from 'react-native';
import {Colors} from 'src/styles';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {useTranslation} from 'react-i18next';
import type {StackScreenProps} from '@react-navigation/stack';
import {SvgIcon} from 'react3l-native-kit';
import SupportItem from 'src/components/morecules/SupportItem/SupportItem';

export function GeneralSettingScreen(
  props: PropsWithChildren<GeneralSettingScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('General Setting')}
        isLeftIcon={true}
        contentScrollable={true}
        onLeftPress={navigation.goBack}
        backGround={Colors.Secondary}>
        <View style={styles.container}>
          <SupportItem
            onPress={() => {}}
            iconL={
              <SvgIcon
                component={require('assets/icons/24/message-edit.svg')}
              />
            }
            iconR={
              <SvgIcon
                component={require('assets/icons/24/chevron-right.svg')}
              />
            }
            title={translate('Ngôn ngữ')}
          />
        </View>
      </DefaultLayout>
    </>
  );
}

export interface GeneralSettingScreenProps extends StackScreenProps<any> {
  //
}

GeneralSettingScreen.defaultProps = {
  //
};

GeneralSettingScreen.displayName = nameof(GeneralSettingScreen);

export default GeneralSettingScreen;
