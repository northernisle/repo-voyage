import { QUERY_REPOS } from './actionTypes';
import store from '../store';
import axios from '../../utils/configs/axiosConfig';
import parse from 'parse-link-header';

export default (
  query = {
    value: null,
    order: 'asc',
    orderBy: null,
    page: null
  }
) => async dispatch => {
  const type = QUERY_REPOS;

  dispatch({
    type,
    status: 'pending'
  });

  let response = null;
  let error = null;
  let status = null;

  let url = '/search/repositories';

  if (query.value) {
    url += `?q=${query.value}`;

    if (query.orderBy) {
      url += `&sort=${query.orderBy}&order=${query.order}`;
    }

    const perPage = store.getState().repoListSettings?.perPage;
    if (perPage) {
      url += `&per_page=${perPage}`;
    }

    if (query.page) {
      url += `&page=${query.page}`;
    }
  }

  try {
    const {
      data,
      headers: { link }
    } = await axios.get(url);

    response = {
      query: query.value,
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
