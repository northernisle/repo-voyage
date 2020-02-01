import React, { useState, useEffect } from 'react';
import axios from '../../../utils/configs/axiosConfig';
import sanitizeHtml from 'sanitize-html';
import { CircularProgress } from '@material-ui/core';

import styles from './readme.module.scss';

const Readme = ({ readmeUrl }) => {
  const [readmeHTML, setReadmeHTML] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReadme = async () => {
      try {
        const { data } = await axios.get(readmeUrl, {
          headers: {
            Accept: 'application/vnd.github.3.html'
          }
        });

        setReadmeHTML(data);
      } catch (e) {
        setError(true);
      }
    };

    if (readmeUrl) {
      getReadme();
    }
  }, [readmeUrl]);

  if (error) {
    return null;
  }

  if (!readmeHTML) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>README.md</p>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(readmeHTML, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2'])
          })
        }}
      ></div>
    </div>
  );
};

export default Readme;
