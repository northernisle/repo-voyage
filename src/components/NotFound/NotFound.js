import React from 'react';
import { Button } from '@material-ui/core';

import styles from './notFound.module.scss';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const history = useHistory();
  const { t } = useTranslation(undefined, { useSuspense: false });

  return (
    <div className={styles.container}>
      <p>{t('Lost, huh?')}</p>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push('/')}
      >
        {t('Get back to safety')}
      </Button>
    </div>
  );
};

export default NotFound;
