import React from 'react';
import history from './store/history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Routes from './router';
import Header from 'Components/header/index.js';

import { split } from 'apollo-link';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';
import ThemeWrapper from './theme-wrapper';
import { IntlProvider } from 'react-intl';

import 'babel-polyfill';
import 'whatwg-fetch';

import store from './store';

const cache = new InMemoryCache();

const wsLink = new WebSocketLink({
  uri: `ws://10.8.0.34:3000/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'http://10.8.0.34:3000/graphql',
  headers: {
    token: localStorage.getItem('token'),
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache,
});

export default () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <IntlProvider locale="en">
          <ThemeWrapper>
            <Header />
            <div className="app-content">
              <Router history={history}>
                <Routes />
              </Router>
            </div>
          </ThemeWrapper>
        </IntlProvider>
      </ApolloProvider>
    </Provider>
  );
};
