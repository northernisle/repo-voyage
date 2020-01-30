import React, { useState, useEffect, useRef } from 'react';
import qs from 'query-string';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';

import { queryRepos } from '../../../redux/actions';

import styles from './search.module.scss';

const Search = ({ queryRepos }) => {
  const [query, setQuery] = useState('');
  const timer = useRef({ timeout: null, debounceTime: 0 });

  useEffect(() => {
    const { q: query } = qs.parse(window.location.search);
    if (query) {
      setQuery(query);
    }
  }, [setQuery]);

  useEffect(() => {
    clearTimeout(timer.current.timeout);

    timer.current.timeout = setTimeout(() => {
      if (query) {
        queryRepos({ value: query });
      }
    }, timer.current.debounceTime);
  }, [query, queryRepos]);

  const handleInputChange = e => {
    const currentValue = e?.target.value.trim();
    timer.current.debounceTime = 1000;
    setQuery(currentValue);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Name your next expedition</h1>
      <TextField
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

export default connect(undefined, { queryRepos })(Search);
