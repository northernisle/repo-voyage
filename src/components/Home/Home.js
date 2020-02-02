import React from 'react';

import Search from './Search';
import RepoTableContainer from './RepoTableContainer';

import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerRow}>
        <Search />
        <RepoTableContainer />
      </div>
    </div>
  );
};

export default Home;
