import nameof from 'ts-nameof.macro';
import styles from './TabNavigator.scss';
import {useTranslation} from 'react-i18next';
import {Pressable, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ANDROID, IOS} from 'src/config/const';
import {atomicStyles, Colors} from 'src/styles';
import Home from 'assets/icons/tabs/home';
import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {
  HomeScreen,
  PrintingScreen,
  SettingScreen,
  TrackingScreen,
} from 'src/screens/Tab';
import Tracking from 'assets/icons/tabs/tracking';
import Folder from 'assets/icons/tabs/folder';
import Setting from 'assets/icons/tabs/setting';

/**
 * File: TabNavigator.tsx
 * @created 2022-02-02 00:51:10
 * @author Ngo Tien Tan <ngotientan811@gmail.com>
 * @type {FC<PropsWithChildren<TabNavigatorProps>>}
 */

const {Navigator, Screen} = createBottomTabNavigator();

const TabNavigator: FC<PropsWithChildren<TabNavigatorProps>> = (
  props: PropsWithChildren<TabNavigatorProps>,
): ReactElement => {
  const [translate] = useTranslation();

  const {} = props;

  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelPosition: 'below-icon',
          tabBarHideOnKeyboard: true,
          unmountOnBlur: true,
          lazy: false,
        }}
        initialRouteName={TabNavigator.displayName}>
        {[HomeScreen, TrackingScreen, PrintingScreen, SettingScreen].map(
          ScreenComponent => (
            <Screen
              key={ScreenComponent.displayName}
              name={ScreenComponent.displayName!}
              component={ScreenComponent}
              initialParams={{}}
              options={{
                tabBarStyle: {
                  height: IOS ? 100 : 85,
                },
                tabBarButton({children, onPress}) {
                  const [icon, label] = React.Children.toArray(children);
                  return (
                    <Pressable style={[styles.tabBarButton]} onPress={onPress}>
                      <View style={[atomicStyles.my3]}>{icon}</View>
                      <View style={[atomicStyles.flexGrow]}>{label}</View>
                    </Pressable>
                  );
                },
                tabBarIcon({focused}) {
                  switch (ScreenComponent.displayName) {
                    case HomeScreen.displayName:
                      return focused ? (
                        <Home color={Colors.Primary} />
                      ) : (
                        <Home color={Colors.Neutral} />
                      );

                    case TrackingScreen.displayName:
                      return focused ? (
                        <Tracking color={Colors.Primary} />
                      ) : (
                        <Tracking color={Colors.Neutral} />
                      );

                    case PrintingScreen.displayName:
                      return focused ? (
                        <Folder color={Colors.Primary} />
                      ) : (
                        <Folder color={Colors.Neutral} />
                      );

                    case SettingScreen.displayName:
                      return focused ? (
                        <Setting color={Colors.Primary} />
                      ) : (
                        <Setting color={Colors.Neutral} />
                      );
                  }
                },
                tabBarLabel({focused}) {
                  let tabLabel;
                  switch (ScreenComponent.displayName) {
                    case HomeScreen.displayName:
                      tabLabel = translate('tab.control');
                      break;

                    case TrackingScreen.displayName:
                      tabLabel = translate('tab.tracking');
                      break;

                    case PrintingScreen.displayName:
                      tabLabel = translate('tab.sdCard');
                      break;

                    case SettingScreen.displayName:
                      tabLabel = translate('tab.setting');
                      break;
                  }

                  return (
                    <Text
                      style={[
                        styles.label,
                        focused
                          ? atomicStyles.textPrimary
                          : atomicStyles.textSecondary,
                        atomicStyles.bold,
                        ANDROID && atomicStyles.androidBold,
                      ]}>
                      {tabLabel}
                    </Text>
                  );
                },
              }}
            />
          ),
        )}
      </Navigator>
    </>
  );
};

export interface TabNavigatorProps {
  //
}

TabNavigator.defaultProps = {
  //
};

TabNavigator.propTypes = {
  //
};

TabNavigator.displayName = nameof(TabNavigator);

export default TabNavigator;
