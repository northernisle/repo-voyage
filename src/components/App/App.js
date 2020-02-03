import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/configs/muiSettings';
import { connect } from 'react-redux';

import { getToken } from '../../redux/actions';

import Home from '../Home';
import Repository from '../Repository';
import NotFound from '../NotFound';
import Auth from '../Auth';
import Header from '../Header/Header';

const App = ({ getToken }) => {
  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={settings}>
        <Header />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/:owner/:repoName" exact={true} component={Repository} />
          <Route path="/auth" exact={true} component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default connect(undefined, { getToken })(App);
