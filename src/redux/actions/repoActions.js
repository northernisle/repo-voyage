import { QUERY_REPOS } from './actionTypes';
import axios from '../../utils/configs/axiosConfig';

export const queryRepos = (query) => async dispatch => {
  const type = QUERY_REPOS;

  dispatch({
    type,
    status: 'pending'
  });

  let response = null;
  let error = null;
  let status = null;

  try {
    ({ data: response } = await axios.get(`/search/repositories?q=${query}`));

    status = 'success';
  } catch (e) {
    error = e;
    status = 'error';
  }

  dispatch({
    type,
    status,
    error,
    response
  });
};
