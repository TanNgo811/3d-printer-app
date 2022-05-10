import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import './GeneralSettingLanguageScreen.scss';
import nameof from 'ts-nameof.macro';
import {useTranslation} from 'react-i18next';
import DefaultLayout from 'src/components/templates/DefaultLayout/DefaultLayout';
import {Colors} from 'src/styles';
import {View} from 'react-native';
import styles from 'src/screens/Root/GeneralSettingScreen/GeneralSettingScreen.scss';
import SupportItem from 'src/components/morecules/SupportItem/SupportItem';
import {SvgIcon} from 'react3l-native-kit';
import type {StackScreenProps} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {languageSelector} from 'src/store/selector';
import {globalSlice, store} from 'src/store';
import {AppLanguage} from 'src/types/AppLanguage';

export function GeneralSettingLanguageScreen(
  props: PropsWithChildren<GeneralSettingLanguageScreenProps>,
): ReactElement {
  const {navigation} = props;

  const [translate] = useTranslation();

  const currentLanguage = useSelector(languageSelector);

  const languages = [
    {
      title: translate('lang.vietnamese'),
      language: AppLanguage.VIETNAMESE,
    },
    {
      title: translate('lang.english'),
      language: AppLanguage.ENGLISH,
    },
  ];

  const {changeLanguage} = globalSlice.actions;

  const handleChangeLanguage = React.useCallback(
    item => {
      //
      store.dispatch(changeLanguage(item?.language));
    },
    [changeLanguage],
  );

  return (
    <>
      <DefaultLayout
        customHeader={false}
        title={translate('lang.languages')}
        isLeftIcon={true}
        contentScrollable={true}
        onLeftPress={navigation.goBack}
        backGround={Colors.Secondary}>
        <View style={styles.container}>
          {languages?.map((item, index) => (
            <SupportItem
              key={index}
              onPress={() => handleChangeLanguage(item)}
              iconR={
                item.language === currentLanguage ? (
                  <SvgIcon
                    component={require('assets/icons/24/blue-tick-circle.svg')}
                  />
                ) : (
                  <View />
                )
              }
              title={item?.title}
            />
          ))}
        </View>
      </DefaultLayout>
    </>
  );
}

export interface GeneralSettingLanguageScreenProps
  extends StackScreenProps<any> {
  //
}

GeneralSettingLanguageScreen.defaultProps = {
  //
};

GeneralSettingLanguageScreen.displayName = nameof(GeneralSettingLanguageScreen);

export default GeneralSettingLanguageScreen;
