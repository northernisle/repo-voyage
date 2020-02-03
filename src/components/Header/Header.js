import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AuthButton from '../AuthButton';

import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerRow}>
        <Link to="/">
          <Button className={styles.whiteLink}>Home</Button>
        </Link>
        <AuthButton className={styles.whiteLink} />
      </div>
    </div>
  );
};

export default Header;
