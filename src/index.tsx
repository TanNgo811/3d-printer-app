/**
 * @format
 */

import {name as appName} from 'app.json';
import React, {FC, Suspense} from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import localization from 'react3l-localization';
import {store} from './store';
import {AppLanguage} from './types/AppLanguage';

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
    <Provider store={store}>
      <SafeAreaProvider>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </SafeAreaProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppEntry);
