import { GET_REPO, CLEAR_REPO } from '../actions/actionTypes';
import processAsyncAction from './utils/processAsyncAction';

export default (
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
