import React, { useEffect, useRef } from 'react';
import { CircularProgress } from '@material-ui/core';
import { StarRate, Visibility, CallSplit } from '@material-ui/icons';
import { connect } from 'react-redux';

import { getRepo, clearRepo } from '../../redux/actions/';
import useResponse from '../../utils/hooks/useResponse';

import Error from '../Error';
import LanguageList from './LanguageList';
import Readme from './Readme/Readme';

import styles from './repository.module.scss';

const Repository = ({ match, repo, getRepo, clearRepo }) => {
  const [pending, error, response] = useResponse(repo);
  const { owner, repoName } = match.params;
  const restore = useRef();

  useEffect(() => {
    if (owner && repoName) {
      getRepo(owner, repoName);
      restore.current = () => getRepo(owner, repoName);
    }

    return () => clearRepo();
  }, [owner, repoName, getRepo, clearRepo]);

  if (error) {
    return (
      <div className={styles.centerContainer}>
        <Error error={error} restore={restore.current} />
      </div>
    );
  }

  if (pending) {
    return (
      <div className={styles.centerContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerRow}>
        <div className={styles.header}>
          <a href={response.owner.html_url}>
            <img
              className={styles.ownerPicture}
              src={response.owner.avatar_url}
              alt={response.owner.login}
            />
          </a>
          <div className={styles.info}>
            <div className={styles.name}>
              <a href={response.html_url}>
                {response.owner.login} / {response.name}
              </a>
              <div className={styles.description}>
                <p>{response.description}</p>
              </div>
            </div>
            <div className={styles.stats}>
              <a
                href={`${response.html_url}/stargazers`}
                className={styles.stats_item}
              >
                <StarRate />
                <p>{response.stargazers_count}</p>
              </a>
              <a
                href={`${response.html_url}/watchers`}
                className={styles.stats_item}
              >
                <Visibility />
                <p>{response.subscribers_count}</p>
              </a>
              <a
                href={`${response.html_url}/network/members`}
                className={styles.stats_item}
              >
                <CallSplit />
                <p>{response.forks_count}</p>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{response.description}</p>
          </div>
          <div className={styles.innerRow}>
            <LanguageList languages_url={response.languages_url} />
          </div>
          <div className={styles.innerRow}>
            <Readme readmeUrl={`${response.url}/readme`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ repo }) => ({ repo }), { getRepo, clearRepo })(
  Repository
);
