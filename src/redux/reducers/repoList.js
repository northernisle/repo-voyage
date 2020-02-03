import {
  SEARCH_REPOS,
  SEARCH_REPOS_OPTIONS,
  RESET_REPOS
} from '../actions/actionTypes';
import processAsyncAction from './utils/processAsyncAction';

const defaultState = {
  pending: false,
  response: null,
  error: null,
  options: { perPage: 10, order: null, orderBy: null, page: 1 }
};

export default (state = defaultState, action) => {
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
