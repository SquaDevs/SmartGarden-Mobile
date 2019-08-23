import React from 'react';
import Color from '~/config/Colors';

import { StatusBar } from 'react-native';

import '~/config/ReactotronConfig';

import Routes from '~/routes';
import { Provider } from 'react-redux';
import store from '~/store';

const App = () => (
  <Provider store={store} >
    <StatusBar barStyle="light-content" backgroundColor={Color} />
    <Routes />
  </Provider>
);

export default App;
