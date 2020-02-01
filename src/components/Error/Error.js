import React, { useEffect, useState } from 'react';
import RateLimitError from './RateLimitError';

import styles from './error.module.scss';

const Error = ({ error, restore }) => {
  const [limitError, setLimitError] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    const status = error?.response.status;
    const headers = error?.response.headers;
    const total = +headers['x-ratelimit-limit'];
    const remaining = +headers['x-ratelimit-remaining'];

    if (status === 403) {
      if (remaining === 0) {
        setLimitError(true);
      } else if (total - remaining === 1) {
        restore();
      }
    }

    setDisplayError(true);
  }, [error, restore, setLimitError, setDisplayError]);

  if (!displayError) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.status}>{error?.response.status}</h2>
      {limitError ? (
        <RateLimitError headers={error?.response.headers} restore={restore} />
      ) : (
        <p className={styles.text}>{error?.response.data.message}</p>
      )}
    </div>
  );
};

export default Error;
