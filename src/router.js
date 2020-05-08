import React from 'react';
import store from 'store';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from 'containers/home';
import MatchContainer from 'containers/match';
import LoginContainer from 'containers/login';
import EmbedContainer from 'containers/embed';

const getUser = () => localStorage.getItem('token');

const PrivateRoute = (props) => {
  if (!getUser()) {
    return <Redirect to={`/login`} />;
  }
  return <Route {...props} />;
};

const MatchRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        const {
          match: {
            params: { id },
          },
        } = routeProps;
        return <MatchContainer matchId={id} />;
      }}
    />
  );
};

const Router = () => (
  <Switch>
    <PrivateRoute exact path="/" component={HomeContainer} />
    <MatchRoute exact path="/match/:id" component={MatchContainer} />
    <Route exact path="/embed" component={EmbedContainer} />
    <Route exact path="/login" component={LoginContainer} />
    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

export default Router;
