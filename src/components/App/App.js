import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import settings from '../../utils/configs/muiSettings';

import Home from '../Home';
import Repository from '../Repository';
import NotFound from '../NotFound';

const App = () => (
  <BrowserRouter>
    <ThemeProvider theme={settings}>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/:user/:repo" exact={true} component={Repository} />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
