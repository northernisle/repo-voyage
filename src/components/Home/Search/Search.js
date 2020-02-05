import React, { useState, useEffect, useRef } from 'react';
import qs from 'query-string';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  searchRepos,
  searchReposOptions,
  resetRepos
} from '../../../redux/actions';
import debounce from '../../../utils/helpers/debounce';
import { useResponse } from '../../../utils/hooks';

import styles from './search.module.scss';

const Search = ({ repoList, searchRepos, searchReposOptions, resetRepos }) => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [hideClear, setHideClear] = useState(false);

  const { q: urlQuery } = qs.parse(window.location.search);
  const history = useHistory();

  const [pending, error, , { query }] = useResponse(repoList);

  const timer = useRef(0); // used for the debounce cooldown time

  useEffect(() => {
    setDisabled(error?.response.status === 403);
  }, [error]);

  useEffect(() => {
    if (!pending) {
      setHideClear(false);
    }
  }, [pending, setHideClear]);

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

    setHideClear(text !== query);

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
      <h1 className={styles.title}>{t('Name your next expedition')}</h1>
      <TextField
        disabled={disabled}
        className={styles.input}
        type="text"
        label={t('Repository name')}
        variant="filled"
        value={text}
        onChange={e => handleInputChange(e)}
        InputProps={{
          endAdornment: (
            <>
              {text && !disabled && !hideClear && !pending && (
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

export default connect(({ repoList }) => ({ repoList }), {
  searchRepos,
  searchReposOptions,
  resetRepos
})(Search);
