import nameof from 'ts-nameof.macro';
import styles from './TabNavigator.scss';
import {useTranslation} from 'react-i18next';
import {Pressable, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ANDROID, IOS} from 'src/config/const';
import {atomicStyles} from 'src/styles';
import {Colors} from 'src/styles';
import Bag from 'assets/icons/tabs/bag';
import Home from 'assets/icons/tabs/home';
import Send from 'assets/icons/tabs/send';
import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {HomeScreen, ProcessingScreen, SettingScreen} from 'src/screens/Tab';

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
        }}
        initialRouteName={TabNavigator.displayName}>
        {[HomeScreen, ProcessingScreen, SettingScreen].map(ScreenComponent => (
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

                  case ProcessingScreen.displayName:
                    return focused ? (
                      <Send color={Colors.Primary} />
                    ) : (
                      <Send color={Colors.Neutral} />
                    );

                  case SettingScreen.displayName:
                    return focused ? (
                      <Bag color={Colors.Primary} />
                    ) : (
                      <Bag color={Colors.Neutral} />
                    );
                }
              },
              tabBarLabel({focused}) {
                let tabLabel;
                switch (ScreenComponent.displayName) {
                  case HomeScreen.displayName:
                    tabLabel = translate('Trang chủ');
                    break;

                  case ProcessingScreen.displayName:
                    tabLabel = translate('Theo dõi');
                    break;

                  case SettingScreen.displayName:
                    tabLabel = translate('Cài đặt');
                    break;
                }

                return (
                  <Text
                    style={[
                      styles.label,
                      focused
                        ? atomicStyles.textPrimary
                        : atomicStyles.textSecondaryColor,
                      atomicStyles.bold,
                      ANDROID && atomicStyles.androidBold,
                    ]}>
                    {tabLabel}
                  </Text>
                );
              },
            }}
          />
        ))}
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
