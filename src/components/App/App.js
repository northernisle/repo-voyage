import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/configs/muiSettings';
import { connect } from 'react-redux';
import HybridRouter from '../HybridRouter';

import { getToken } from '../../redux/actions';

import Home from '../Home';
import NotFound from '../NotFound';
import Auth from '../Auth';
import Header from '../Header';
import Repository from '../Repository';

const App = ({ getToken }) => {
  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <HybridRouter>
      <ThemeProvider theme={settings}>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/:owner/:repoName" exact={true} component={Repository} />
          <Route path="/auth" exact={true} component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </HybridRouter>
  );
};

export default connect(undefined, { getToken })(App);
