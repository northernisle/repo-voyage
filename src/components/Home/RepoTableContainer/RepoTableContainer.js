import React, { useMemo, useReducer, useEffect } from 'react';
import { LinearProgress, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { useHistory } from 'react-router-dom';

import { searchRepos } from '../../../redux/actions';
import store from '../../../redux/store';
import { SEARCH_REPOS_OPTIONS } from '../../../redux/actions/actionTypes';

import columns from './columns';
import { useResponse } from '../../../utils/hooks';
import debounce from '../../../utils/helpers/debounce';
import Error from '../../Error';
import RepoTable from './RepoTable';

import styles from './RepoTableContainer.module.scss';

const cx = classnames.bind(styles);

const initialOptions = {
  order: null,
  orderBy: null,
  page: 1,
  perPage: 10
};

const reducer = (state, action) => {
  switch (action.type) {
    case SEARCH_REPOS_OPTIONS:
      store.dispatch(action);
      return { ...state, ...action.payload };
    case 'UPDATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const RepoTableContainer = ({ repoList, searchRepos }) => {
  const { pending, error, response } = useResponse(repoList);
  const { data, links } = response;
  const [state, dispatch] = useReducer(reducer, initialOptions);

  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'UPDATE', payload: repoList.options });
  }, [repoList.options]);

  const noResults = !pending && data?.total_count === 0;
  const initialLoad = pending && (!data || data?.total_count === 0);
  const showTable = (pending || data) && data?.total_count !== 0;
  const showError = !pending && error;

  const handleSort = property => {
    const isAsc = state.orderBy === property && state.order === 'desc';
    const direction = isAsc ? 'asc' : 'desc';
    let _order = { direction, property };

    if (state.order === 'asc') {
      _order = { direction: null, property: null };
    }

    dispatchOptions({
      order: _order.direction,
      orderBy: _order.property
    });
  };

  const handlePageChange = (event, newPage) => {
    if (pending) {
      return;
    }

    // github uses a 1-index based page system
    const requiredPage = newPage > state.page - 1 ? 'next' : 'prev';

    dispatchOptions({
      page: links[requiredPage]?.page
    }, false);
  };

  const handleRowsPerPageChange = event => {
    const rows = parseInt(event.target.value, 10);

    dispatchOptions({
      perPage: rows
    }, false);
  };

  const handleRowClick = (owner, repo) => {
    history.push(`/${owner}/${repo}`);
  };

  const dispatchOptions = (options, debounceRequest = true) => {
    dispatch({
      type: SEARCH_REPOS_OPTIONS,
      payload: {
        ...options
      }
    });

    if (debounceRequest) {
      debounce(searchRepos, 300);
    } else {
      searchRepos();
    }
  };

  // conditional rending of the 'visible' class
  const tableClassNames = useMemo(
    () => cx({ linearLoader: true, visible: pending && showTable }),
    [pending, showTable]
  );

  if (showError) {
    return (
      <div className={classnames(styles.centerContainer, styles.errorContainer)}>
        <Error error={error} restore={searchRepos} />
      </div>
    );
  }

  if (noResults) {
    return <div className={styles.centerContainer}>Did we miss our exit?</div>;
  }

  if (initialLoad) {
    return (
      <div className={styles.centerContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <LinearProgress className={tableClassNames} variant="query" />
      {showTable && (
        <RepoTable
          columns={columns}
          data={data}
          state={state}
          handleSort={handleSort}
          handleRowClick={handleRowClick}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
    </div>
  );
};

export default connect(({ repoList }) => ({ repoList }), { searchRepos })(
  RepoTableContainer
);
