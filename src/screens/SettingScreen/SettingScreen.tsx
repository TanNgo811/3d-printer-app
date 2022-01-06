import React, { FC, PropsWithChildren, ReactElement } from 'react';
import nameof from 'ts-nameof.macro';
import './SettingScreen.scss';

/**
 * File: SettingScreen.tsx
 * @created 2022-01-06 00:24:25
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<SettingScreenProps>>}
 */
const SettingScreen: FC<PropsWithChildren<SettingScreenProps>> = (
  props: PropsWithChildren<SettingScreenProps>,
): ReactElement => {
  return (
    <>
      {props.children}
    </>
  );
};

export interface SettingScreenProps {
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
