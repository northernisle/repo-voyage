import React, { useState, useEffect, useRef } from 'react';
import qs from 'query-string';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { searchRepos, searchReposOptions } from '../../../redux/actions';
import debounce from '../../../utils/helpers/debounce';

import styles from './search.module.scss';
import useRepos from '../../../utils/hooks/useRepos';

const Search = ({ searchRepos, searchReposOptions, repos }) => {
  const [query, setQuery] = useState('');
  const [fieldDisabled, setFieldDisabled] = useState(false);
  const [,error] = useRepos(repos);
  const timer = useRef(0);

  useEffect(() => {
    const { q: query } = qs.parse(window.location.search);
    if (query) {
      setQuery(query);
    }
  }, [setQuery]);

  useEffect(() => {
    setFieldDisabled(error?.response.status === 403);
  }, [error, setFieldDisabled]);

  useEffect(() => {
    debounce(() => {
      if (query) {
        searchReposOptions({ query, page: 1 });
        searchRepos();
      }
    }, timer.current);
  }, [query, searchRepos, searchReposOptions]);

  const handleInputChange = e => {
    const currentValue = e?.target.value.trim();
    if (currentValue.length <= 256) {
      timer.current = 1000;
      setQuery(currentValue);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Name your next expedition</h1>
      <TextField
        
        disabled={fieldDisabled}
        className={styles.input}
        type="text"
        label="Repository name"
        variant="filled"
        value={query}
        onChange={e => handleInputChange(e)}
      />
    </div>
  );
};

export default connect(({ repos }) => ({ repos }), { searchRepos, searchReposOptions })(Search);
