import { combineReducers } from 'redux';
import {
  SEARCH_REPOS,
  SEARCH_REPOS_OPTIONS,
  GET_REPO,
  CLEAR_REPO,
  RESET_REPOS
} from '../actions/actionTypes';
import processAsyncAction from './utils/processAsyncAction';

const defaultState = {
  pending: false,
  response: null,
  error: null,
  options: { perPage: 10, order: null, orderBy: null, page: 1 }
};

const repos = (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_REPOS:
      return processAsyncAction(state, action);

    case SEARCH_REPOS_OPTIONS:
      return { ...state, options: { ...state.options, ...action.payload } };

    case RESET_REPOS:
      return defaultState;

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
