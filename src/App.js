import React from 'react';
import history from './store/history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Routes from './router';
import Header from './components/header';

import ThemeWrapper from './theme-wrapper';

import 'babel-polyfill';
import 'whatwg-fetch';

import store from './store';

export default () => {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Header />
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeWrapper>
    </Provider>
  );
};
