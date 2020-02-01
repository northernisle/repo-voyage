import React from 'react';
import { Button } from '@material-ui/core';

import styles from './notFound.module.scss';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <p>Lost, huh?</p>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push('/')}
      >
        Get back to safety
      </Button>
    </div>
  );
};

export default NotFound;
