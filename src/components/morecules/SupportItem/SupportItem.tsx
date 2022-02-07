import type {FC, PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import nameof from 'ts-nameof.macro';
import styles from './SupportItem.scss';
import {TouchableOpacity} from 'react-native';
import {atomicStyles} from 'src/styles';
import Line from 'src/components/atoms/Line/Line';
import {SvgIcon} from 'react3l-native-kit';

/**
 * File: SupportItem.tsx
 * @created 2021-10-26 14:38:41
 * @author TanNgo <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SupportItemProps>>}
 */
const SupportItem: FC<PropsWithChildren<SupportItemProps>> = (
  props: PropsWithChildren<SupportItemProps>,
): ReactElement => {
  const {iconL, title, iconR, onPress} = props;

  return (
    <>
      <TouchableOpacity
        style={[atomicStyles.mt2, atomicStyles.mb1]}
        onPress={onPress}>
        <Line
          style={[
            atomicStyles.mb2,
            atomicStyles.bgWhite,
            atomicStyles.alignItemsCenter,
            styles.borderBottom,
          ]}
          titleStyle={[atomicStyles.text, styles.title, atomicStyles.textDark]}
          title={title}
          icon={iconL}
          right={
            iconR ? (
              iconR
            ) : (
              <SvgIcon component={require('assets/icons/16/next-ui.svg')} />
            )
          }
        />
      </TouchableOpacity>
    </>
  );
};

export interface SupportItemProps {
  //
  iconL?: ReactElement;

  title?: string;

  iconR?: ReactElement;

  onPress?: () => void;
}

SupportItem.defaultProps = {
  //
};

SupportItem.propTypes = {
  //
};

SupportItem.displayName = nameof(SupportItem);

export default SupportItem;
