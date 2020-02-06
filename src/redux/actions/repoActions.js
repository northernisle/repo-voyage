import { GET_REPO, CLEAR_REPO } from './actionTypes';
import axios from '../../utils/configs/axiosConfig';
import asyncAction from './utils/asyncAction';

export const getRepo = (owner, repo) => async dispatch => {
  asyncAction(dispatch, GET_REPO, async () => {
    const url = `repos/${owner}/${repo}`;

    const { data } = await axios.get(url);

    return data;
  }, 3); // Currently there are 3 requests made on each page load
};

export const clearRepo = () => ({
  type: CLEAR_REPO,
  payload: null
});
