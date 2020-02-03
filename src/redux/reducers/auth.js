import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../actions/actionTypes';
import { updateToken } from '../../utils/configs/axiosConfig';

export default (state = null, action) => {
  switch (action.type) {
    case SET_TOKEN:
      const token = action?.payload;
      window.localStorage.setItem('authToken', token);
      updateToken(token);
      return token;

    case GET_TOKEN:
      return state ?? window.localStorage.getItem('authToken');

    case REMOVE_TOKEN:
      window.localStorage.removeItem('authToken');
      updateToken(null);
      return null;

    default:
      return state;
  }
};
