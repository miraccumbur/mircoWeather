/**
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {persistor, store} from './redux/reducers/configureStore';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const RNRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
