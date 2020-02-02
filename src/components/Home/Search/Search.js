import React, { useState, useEffect, useRef } from 'react';
import qs from 'query-string';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { connect } from 'react-redux';

import { searchRepos, searchReposOptions, resetRepos } from '../../../redux/actions';
import debounce from '../../../utils/helpers/debounce';

import styles from './search.module.scss';
import { useResponse } from '../../../utils/hooks';
import { useHistory } from 'react-router-dom';

const Search = ({ searchRepos, searchReposOptions, resetRepos, repos }) => {
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

  const handleClearEvent = () => {
    setText('');
    history.push('');
    resetRepos();
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
        InputProps={{
          endAdornment: (
            <>
              {(text && !disabled) && (
                <InputAdornment>
                  <IconButton
                    onClick={handleClearEvent}
                    onMouseDown={e => e.preventDefault()}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              )}
            </>
          )
        }}
      />
    </div>
  );
};

export default connect(({ repos }) => ({ repos }), {
  searchRepos,
  searchReposOptions,
  resetRepos
})(Search);
