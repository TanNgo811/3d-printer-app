import nameof from 'ts-nameof.macro';
import styles from './Header.scss';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {atomicStyles} from 'src/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ANDROID, HEIGHT_HEADER, SCREEN_WIDTH} from 'src/config/const';
import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import {SvgIcon} from 'react3l-native-kit';

/**
 * File: Header.tsx
 * @created 2021-07-28 11:14:18
 * @author tientv <tientv20@fpt.com.vn>
 * @type {FC<PropsWithChildren<HeaderProps>>}
 */
const headerHeightBase: number = 65;

const Header: FC<PropsWithChildren<HeaderProps>> = (
  props: PropsWithChildren<HeaderProps>,
): ReactElement => {
  const {
    title,
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress,
    isLeftIcon,
    rightIcon2Sub,
    onRightPressSub,
  } = props;

  const {top} = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          height: top === 0 ? HEIGHT_HEADER : top! + headerHeightBase,
        },
      ]}>
      <ImageBackground
        resizeMode="cover"
        style={[
          {
            height: headerHeightBase + top,
            width: SCREEN_WIDTH,
          },
        ]}
        source={require('assets/images/bgNotification.png')}>
        <View style={[styles.header]}>
          {isLeftIcon && leftIcon && (
            <TouchableOpacity
              onPress={
                typeof onLeftPress === 'function' ? onLeftPress : undefined
              }
              style={[styles.button]}>
              {leftIcon}
            </TouchableOpacity>
          )}
          <View style={[styles.titleContainer]}>
            <Text
              numberOfLines={1}
              style={[
                styles.title,
                atomicStyles.textWhite,
                atomicStyles.bold,
                ANDROID && atomicStyles.androidBold,
              ]}>
              {title}
            </Text>
          </View>
          {rightIcon2Sub ? (
            <TouchableOpacity onPress={onRightPressSub}>
              {rightIcon2Sub}
            </TouchableOpacity>
          ) : (
            <View style={[atomicStyles.mr8px]} />
          )}
          {rightIcon ? (
            <TouchableOpacity onPress={onRightPress} style={[styles.button]}>
              {rightIcon}
            </TouchableOpacity>
          ) : (
            <View
              style={[
                isLeftIcon && styles.button,
                isLeftIcon && atomicStyles.mr8px,
              ]}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export interface HeaderProps {
  isLeftIcon?: boolean;

  leftIcon?: ReactElement;

  onLeftPress?(): void;

  onRightPress?(): void;

  onRightPressSub?(): void;

  onLayout?(): void;

  rightIcon?: ReactElement;

  rightIcon2Sub?: ReactElement;

  title?: string;
}

Header.defaultProps = {
  isLeftIcon: true,

  leftIcon: <SvgIcon component={require('assets/icons/system/left.svg')} />,
};

Header.propTypes = {
  //
};

Header.displayName = nameof(Header);

export default Header;
