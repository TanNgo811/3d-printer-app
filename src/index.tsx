/**
 * @format
 */

import {name as appName} from 'app.json';
import React, {FC, Suspense} from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import localization from 'react3l-localization';
import {store} from './store';
import {AppLanguage} from './types/AppLanguage';
import {NavigationContainer} from '@react-navigation/native';
import nameof from 'ts-nameof.macro';

const App = React.lazy(async () => {
  await localization.initialize({
    lng: AppLanguage.VIETNAMESE,
    fallbackLng: AppLanguage.VIETNAMESE,
    ns: '',
    defaultNS: '',
    resources: {
      translations: {},
    },
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  });

  return import('./App');
});

const AppEntry: FC = () => {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Suspense fallback={null}>
              <App />
            </Suspense>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

AppEntry.displayName = nameof(AppEntry);

AppRegistry.registerComponent(appName, () => AppEntry);
