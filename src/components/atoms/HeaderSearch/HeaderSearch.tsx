import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import {atomicStyles, Colors} from 'src/styles';
import nameof from 'ts-nameof.macro';
import styles from './HeaderSearch.scss';
import {HEIGHT_HEADER, SCREEN_WIDTH} from 'src/config/const';
import Input from 'src/components/atoms/Input/Input';
import {useTranslation} from 'react-i18next';
import {SvgIcon} from 'react3l-native-kit';

/**
 * File: HeaderSearch.tsx
 * @created 2021-11-23 11:14:35
 * @author sen <huongsen19122001@gmail.com>
 * @type {FC<PropsWithChildren<HeaderSearchProps>>}
 */
const headerHeightBase: number = 65;
const inputHeightBase: number = 40;
const HeaderSearch: FC<PropsWithChildren<HeaderSearchProps>> = (
  props: PropsWithChildren<HeaderSearchProps>,
): ReactElement => {
  const {top, onChangeValueSearch, onCancel} = props;

  const paddingTop: number = top ? top + 16 : 16;

  const [translate] = useTranslation();

  return (
    <>
      <ImageBackground
        source={require('assets/images/bgNotification.png')}
        style={[
          {
            height: top === 0 ? HEIGHT_HEADER : top! + headerHeightBase,
            backgroundColor: Colors.Primary,
          },
          atomicStyles.flexRow,
          atomicStyles.w100,
          atomicStyles.p4,
          atomicStyles.alignItemsCenter,
          atomicStyles.justifyContentBetween,
          {
            paddingTop: paddingTop,
          },
        ]}>
        <Input
          placeholder={translate('Tìm kiếm')}
          iconLeft={
            <SvgIcon component={require('assets/icons/16/search.svg')} />
          }
          containerStyle={[
            {
              height: inputHeightBase + 2,
              width: SCREEN_WIDTH - 90,
            },
            atomicStyles.p0,
            styles.borderR30,
            styles.zIndex,
          ]}
          inputStyle={[
            {height: inputHeightBase},
            atomicStyles.text,
            styles.inputStyle,
          ]}
          onChange={onChangeValueSearch}
        />
        <TouchableOpacity onPress={onCancel}>
          <Text style={[atomicStyles.textWhite, atomicStyles.pl2]}>
            {translate('Hủy')}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};

export interface HeaderSearchProps {
  top?: number;

  onChangeValueSearch?: (text: string) => void;

  onCancel?: () => void;
}

HeaderSearch.defaultProps = {
  //
};

HeaderSearch.propTypes = {
  //
};

HeaderSearch.displayName = nameof(HeaderSearch);

export default HeaderSearch;
