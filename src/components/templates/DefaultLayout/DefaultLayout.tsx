import PropTypes from 'prop-types';
import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import type {ViewStyle} from 'react-native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from 'src/components/atoms/Header/Header';
import {atomicStyles, Colors} from 'src/styles';
import nameof from 'ts-nameof.macro';
import styles from './DefaultLayout.scss';
import HeaderSearch from 'src/components/atoms/HeaderSearch/HeaderSearch';

/**
 * File: DefaultLayout.tsx
 * @created 2021-07-28 11:12:30
 * @author tientv <tientv20@fpt.com.vn>
 * @type {FC<PropsWithChildren<DefaultLayoutProps>>}
 */

const DefaultLayout: FC<PropsWithChildren<DefaultLayoutProps>> = (
  props: PropsWithChildren<DefaultLayoutProps>,
): ReactElement => {
  const {
    title,
    left,
    right,
    children,
    customHeader,
    header,
    backGround,
    contentScrollable,
    onLeftPress,
    onRightPress,
    isLeftIcon,
    rightIcon2Sub,
    onRightPressSub,
    contentContainerStyle,
    searchTabVisible,
    onSearch,
    onExitSearch,
  } = props;

  const {top} = useSafeAreaInsets();

  const layout: ReactElement = (
    <View style={[{backgroundColor: backGround}]}>
      {customHeader ? (
        header
      ) : searchTabVisible ? (
        <HeaderSearch
          top={top}
          onCancel={onExitSearch}
          onChangeValueSearch={onSearch}
        />
      ) : (
        <Header
          onRightPressSub={onRightPressSub}
          rightIcon2Sub={rightIcon2Sub}
          onLeftPress={
            typeof onLeftPress === 'function' ? onLeftPress : undefined
          }
          onRightPress={onRightPress}
          title={title}
          leftIcon={left}
          rightIcon={right}
          isLeftIcon={isLeftIcon}
        />
      )}
      {contentScrollable ? (
        children
      ) : (
        <View
          style={[
            atomicStyles.w100,
            atomicStyles.h100,
            atomicStyles.flexGrow,
            atomicStyles.bgSecondary,
            atomicStyles.px4,
            atomicStyles.py2,
            {backgroundColor: backGround},
            contentContainerStyle,
          ]}>
          {children}
        </View>
      )}
      <View style={[styles.bottom]} />
    </View>
  );

  return <>{layout}</>;
};

export interface DefaultLayoutProps {
  contentScrollable?: boolean;

  isLeftIcon?: boolean;

  title?: string;

  left?: ReactElement;

  right?: ReactElement;

  onLeftPress?: () => void;

  onRightPress?: () => void;

  customHeader?: boolean;

  header?: ReactElement[] | ReactElement;

  backGround?: Colors;

  rightIcon2Sub?: ReactElement;

  onRightPressSub?(): void;

  contentContainerStyle?: ViewStyle | ViewStyle[];

  searchTabVisible?: boolean;

  onSearch?: (value: string) => void;

  onExitSearch?: () => void;
}

DefaultLayout.defaultProps = {
  isLeftIcon: true,

  contentScrollable: false,

  customHeader: false,

  backGround: Colors.White,

  searchTabVisible: false,
};

DefaultLayout.propTypes = {
  contentScrollable: PropTypes.bool,

  customHeader: PropTypes.bool,
};

DefaultLayout.displayName = nameof(DefaultLayout);

export default DefaultLayout;
