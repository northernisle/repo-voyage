import { combineReducers } from 'redux';
import { QUERY_REPOS, SET_PER_PAGE } from '../actions/actionTypes';
import processAsyncAction from './utils/processAsyncAction';

const repoList = (repoList = null, action) => {
  switch (action.type) {
    case QUERY_REPOS:
      return processAsyncAction(repoList, action);

    default:
      return repoList;
  }
};

const repoListSettings = (settings = { perPage: 10 }, action) => {
  switch (action.type) {
    case SET_PER_PAGE:
      return { ...settings, perPage: action.payload };

    default:
      return settings;
  }
};

export default combineReducers({ repoList, repoListSettings });
