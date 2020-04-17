import React from 'react';
import store from 'store';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from 'containers/home';
import LocalPlayContainer from 'containers/localplay';
import MatchContainer from 'containers/match';
import LoginContainer from 'containers/login';

// const getUser = () => store.getState().auth.user;

const PrivateRoute = props => {
  // if (!getUser()) {
  //   return <Redirect to={`/authlanding?path=${window.location.pathname}`} />;
  // }
  return <Route {...props} />;
};

const MatchRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
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
    <PrivateRoute exact path="/localplay" component={LocalPlayContainer} />
    <MatchRoute exact path="/match/:id" component={MatchContainer} />
    <Route exact path="/login" component={LoginContainer} />
    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

export default Router;
