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
import {globalSlice, store} from './store';
import {AppLanguage} from './types/AppLanguage';
import {NavigationContainer} from '@react-navigation/native';
import nameof from 'ts-nameof.macro';
import {asyncStorageRepository} from 'src/repositories/async-storage-repository';
import {server} from 'src/config/server';

const App = React.lazy(async () => {
  await asyncStorageRepository.initialize();

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

  await localization.addLanguage(
    AppLanguage.VIETNAMESE,
    require('./i18n/vi.json'),
  );

  await localization.addLanguage(
    AppLanguage.ENGLISH,
    require('./i18n/en.json'),
  );

  const {changeLanguage} = globalSlice.actions;

  const language: string | null = await asyncStorageRepository.getLanguage();
  if (language !== AppLanguage.VIETNAMESE) {
    store.dispatch(changeLanguage(language as AppLanguage));
  }

  const serverUrl = await asyncStorageRepository.getServerUrl();

  if (serverUrl) {
    await server.setServerUrl(serverUrl);
  }

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
