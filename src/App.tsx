/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import RootNavigator from 'src/navigators/RootNavigator/RootNavigator';
import {IOS} from 'src/config/const';

const App = () => {
  React.useEffect(() => {
    IOS && require('react-native-splash-screen').default.hide();
  }, []);

  return <RootNavigator />;
};

export default App;
