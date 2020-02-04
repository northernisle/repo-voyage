import React, { Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';

import Search from './Search';
import styles from './home.module.scss';

const RepoTableContainer = React.lazy(() => import('./RepoTableContainer'));

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerRow}>
        <Search />
        <Suspense
          fallback={
            <div className={styles.center}>
              <CircularProgress />
            </div>
          }
        >
          <RepoTableContainer />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
