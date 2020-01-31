import React from 'react';

import Search from './Search';
import RepoTableContainer from './RepoTableContainer';

import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <Search />
      <RepoTableContainer />
    </div>
  );
};

export default Home;
