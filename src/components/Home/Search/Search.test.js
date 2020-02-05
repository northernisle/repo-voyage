import React from 'react';
import Search from './Search';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import store from '../../../redux/store';
import { SEARCH_REPOS_OPTIONS } from '../../../redux/actions/actionTypes';

test('input value should match redux state on component load without a url query', async () => {
  const history = createMemoryHistory();

  store.dispatch({
    type: SEARCH_REPOS_OPTIONS,
    payload: {
      query: 'malone'
    }
  });

  const { getByText } = render(
    <Router history={history}>
      <Provider store={store}>
        <Search />
      </Provider>
    </Router>
  );

  const inputValue = getByText(
    'Repository name'
  ).parentElement.getElementsByTagName('input')[0].value;

  expect(inputValue).toBe(store.getState().repoList.options.query);
});
