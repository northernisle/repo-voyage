import { combineReducers } from 'redux';
import {
  SEARCH_REPOS,
  SEARCH_REPOS_OPTIONS,
  GET_REPO,
  CLEAR_REPO
} from '../actions/actionTypes';
import processAsyncAction from './utils/processAsyncAction';

const repos = (
  state = {
    pending: false,
    response: null,
    error: null,
    options: { perPage: 10 }
  },
  action
) => {
  switch (action.type) {
    case SEARCH_REPOS:
      return processAsyncAction(state, action);

    case SEARCH_REPOS_OPTIONS:
      return { ...state, options: { ...state.options, ...action.payload } };

    default:
      return state;
  }
};

const repo = (
  state = {
    pending: true, // reducer called on page load
    response: null,
    error: null
  },
  action
) => {
  switch (action.type) {
    case GET_REPO:
      return processAsyncAction(state, action);
    case CLEAR_REPO:
      return {
        response: null,
        pending: true,
        error: null
      };
    default:
      return state;
  }
};

export default combineReducers({ repos, repo });
