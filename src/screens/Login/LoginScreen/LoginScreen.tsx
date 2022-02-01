import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './LoginScreen.scss';

/**
 * File: LoginScreen.tsx
 * @created 2022-02-02 01:14:16
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<LoginScreenProps>>}
 */
const LoginScreen: FC<PropsWithChildren<LoginScreenProps>> = (
  props: PropsWithChildren<LoginScreenProps>,
): ReactElement => {
  return <>{props.children}</>;
};

export interface LoginScreenProps {
  //
}

LoginScreen.defaultProps = {
  //
};

LoginScreen.propTypes = {
  //
};

LoginScreen.displayName = nameof(LoginScreen);

export default LoginScreen;
