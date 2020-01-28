import { combineReducers } from 'redux';
import { QUERY_REPOS } from '../actions/actionTypes';
import processAsyncAction from './utils/processAsyncAction';

const repoList = (repoList = null, action) => {
  switch (action.type) {
    case QUERY_REPOS:
      return processAsyncAction(repoList, action);

    default:
      return repoList;
  }
};

export default combineReducers({ repoList });
