import React from 'react';
import store from 'store';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from 'containers/home';
import LocalPlayContainer from 'containers/localplay';

// const getUser = () => store.getState().auth.user;

const PrivateRoute = props => {
  // if (!getUser()) {
  //   return <Redirect to={`/authlanding?path=${window.location.pathname}`} />;
  // }
  return <Route {...props} />;
};

const Router = () => (
  <Switch>
    <PrivateRoute exact path="/" component={HomeContainer} />
    <PrivateRoute exact path="/localplay" component={LocalPlayContainer} />
    <Route component={() => <Redirect to="/" />} />
  </Switch>
);

export default Router;
