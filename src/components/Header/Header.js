import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AuthButton from '../AuthButton';
import { useTranslation } from 'react-i18next';

import styles from './header.module.scss';

const Header = () => {
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className={styles.container}>
      <div className={styles.innerRow}>
        <Link to="/" className={styles.link}>
          <Button className={styles.button}>{t('Home')}</Button>
        </Link>
        <AuthButton className={styles.button} />
      </div>
    </div>
  );
};

export default Header;
