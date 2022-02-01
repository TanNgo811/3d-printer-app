import React, {FC, PropsWithChildren, ReactElement} from 'react';
import nameof from 'ts-nameof.macro';
import './RootNavigator.scss';
import TabNavigator from 'src/navigators/TabNavigator/TabNavigator';
import * as Screens from 'src/screens/Root';
import {createStackNavigator} from '@react-navigation/stack';

/**
 * File: RootNavigator.tsx
 * @created 2022-02-02 00:51:26
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<RootNavigatorProps>>}
 */

const {Navigator, Screen} = createStackNavigator();

const RootNavigator: FC<PropsWithChildren<RootNavigatorProps>> = (
  props: PropsWithChildren<RootNavigatorProps>,
): ReactElement => {
  const {} = props;

  return (
    <Navigator
      initialRouteName={TabNavigator.displayName!}
      screenOptions={{headerShown: false}}>
      {Object.values(Screens).map((ScreenComponent: any) => (
        <Screen
          component={ScreenComponent}
          name={ScreenComponent.displayName!}
          key={ScreenComponent.displayName!}
          initialParams={{}}
        />
      ))}
      {[TabNavigator].map(ScreenComponent => (
        <Screen
          component={ScreenComponent}
          name={ScreenComponent.displayName!}
          key={ScreenComponent.displayName!}
          initialParams={{}}
        />
      ))}
    </Navigator>
  );
};

export interface RootNavigatorProps {
  //
}

RootNavigator.defaultProps = {
  //
};

RootNavigator.propTypes = {
  //
};

RootNavigator.displayName = nameof(RootNavigator);

export default RootNavigator;
