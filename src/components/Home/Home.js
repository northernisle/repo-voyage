import React from 'react';
import Search from './Search';
import RepoTable from './RepoTable';

import styles from './home.module.scss';

const Home = () => {
  return (
    <div className={styles.container}>
      <Search />
      <RepoTable />
    </div>
  );
};

export default Home;
