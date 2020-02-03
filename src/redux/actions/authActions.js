import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from './actionTypes';
import axios from '../../utils/configs/axiosConfig';

// github.com, understandably, doens't support CORS this is a workaround
// as described in https://github.com/isaacs/github/issues/330
const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

export const setToken = (
  clientId,
  clientSecret,
  code,
  state
) => async dispatch => {
  const url = `${corsAnywhereUrl}https://github.com/login/oauth/access_token`;

  const { data } = await axios.post(
    url,
    {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      state
    },
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );

  const { access_token } = data;

  if (!access_token) {
    return;
  }

  dispatch({
    type: SET_TOKEN,
    payload: access_token
  });
};

export const getToken = () => ({
  type: GET_TOKEN,
  payload: null
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
  payload: null
});