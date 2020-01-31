import { SEARCH_REPOS, SEARCH_REPOS_OPTIONS } from './actionTypes';
import store from '../store';
import axios from '../../utils/configs/axiosConfig';
import parse from 'parse-link-header';

export const searchRepos = () => async dispatch => {
  const type = SEARCH_REPOS;
  const options = store.getState().repos.options;

  dispatch({
    type,
    status: 'pending'
  });

  let response = null;
  let error = null;
  let status = null;

  let url = '/search/repositories';

  if (options.query) {
    url += `?q=${options.query}`;

    if (options.orderBy) {
      url += `&sort=${options.orderBy}&order=${options.order}`;
    }

    if (options.perPage) {
      url += `&per_page=${options.perPage}`;
    }

    if (options.page) {
      url += `&page=${options.page}`;
    }
  }

  try {
    const {
      data,
      headers: { link }
    } = await axios.get(url);

    response = {
      data,
      links: parse(link)
    };

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

export const searchReposOptions = (
  options = {
    query: null,
    order: 'asc',
    orderBy: null,
    page: null,
    perPage: null
  }
) => ({
  type: SEARCH_REPOS_OPTIONS,
  payload: options
});
