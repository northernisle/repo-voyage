import React, { useState, useEffect, useRef } from 'react';
import qs from 'query-string';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { searchRepos, searchReposOptions } from '../../../redux/actions';
import debounce from '../../../utils/helpers/debounce';

import styles from './search.module.scss';
import { useResponse } from '../../../utils/hooks';
import { useHistory } from 'react-router-dom';

const Search = ({ searchRepos, searchReposOptions, repos }) => {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(false);

  const { q: urlQuery } = qs.parse(window.location.search);
  const history = useHistory();

  const [, error, , { query }] = useResponse(repos);

  const timer = useRef(0);

  useEffect(() => {
    setDisabled(error?.response.status === 403);
  }, [error]);

  useEffect(() => {
    if (urlQuery) {
      setText(urlQuery);
    } else if (query) {
      setText(query);
    }
  }, [urlQuery, query]);


  useEffect(() => {
    if (!text) {
      return;
    }

    debounce(() => {
      if (text === query) {
        return;
      }

      if (text !== urlQuery) {
        history.push(`?q=${text}`);
      }

      searchReposOptions({ query: text, page: 1 });
      searchRepos();
    }, timer.current);
  }, [text, searchReposOptions, searchRepos, query, urlQuery, history]);

  const handleInputChange = e => {
    const currentValue = e?.target.value.trim();
    if (currentValue.length <= 256) {
      timer.current = 1000;
      setText(currentValue);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Name your next expedition</h1>
      <TextField
        disabled={disabled}
        className={styles.input}
        type="text"
        label="Repository name"
        variant="filled"
        value={text}
        onChange={e => handleInputChange(e)}
      />
    </div>
  );
};

export default connect(({ repos }) => ({ repos }), {
  searchRepos,
  searchReposOptions
})(Search);
