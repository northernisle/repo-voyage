import parse from 'parse-link-header';
import { SEARCH_REPOS, SEARCH_REPOS_OPTIONS, RESET_REPOS } from './actionTypes';
import store from '../store';
import axios from '../../utils/configs/axiosConfig';
import asyncAction from './utils/asyncAction';

export const searchRepos = () => async dispatch => {
  asyncAction(dispatch, SEARCH_REPOS, async () => {
    const options = store.getState().repos.options;

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

    const {
      data,
      headers: { link }
    } = await axios.get(url);

    return {
      data,
      links: parse(link)
    };
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

export const resetRepos = () => ({
  type: RESET_REPOS,
  payload: null
});
