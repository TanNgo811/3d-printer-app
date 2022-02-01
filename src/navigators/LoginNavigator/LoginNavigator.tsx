import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './LoginNavigator.scss';

/**
 * File: LoginNavigator.tsx
 * @created 2022-02-02 00:51:43
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<LoginNavigatorProps>>}
 */
const LoginNavigator: FC<PropsWithChildren<LoginNavigatorProps>> = (
  props: PropsWithChildren<LoginNavigatorProps>,
): ReactElement => {
  return <>{props.children}</>;
};

export interface LoginNavigatorProps {
  //
}

LoginNavigator.defaultProps = {
  //
};

LoginNavigator.propTypes = {
  //
};

LoginNavigator.displayName = nameof(LoginNavigator);

export default LoginNavigator;
