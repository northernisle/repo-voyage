import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import { connect } from 'react-redux';
import { resetTime } from '../../redux/actions';
import classnames from 'classnames/bind';
import AuthButton from '../AuthButton';

import styles from './header.module.scss';
import useDynamicTranslation from '../../utils/hooks/useDynamicTranslation';

const cx = classnames.bind(styles);

const Header = ({ elapsed, resetTime }) => {
  const t = useDynamicTranslation();

  const counterClassNames = useMemo(
    () => cx({ counter: true, visible: !!elapsed }),
    [elapsed]
  );

  return (
    <div className={styles.header}>
      <div className={styles.navigation}>
        <Link to="/" className={styles.link} onClick={resetTime}>
          <Button className={styles.button}>{t('Home')}</Button>
        </Link>
        <AuthButton className={styles.button} />
      </div>
      <div className={styles.panel}>
        <div className={counterClassNames}>
          <Tooltip title={t('milliseconds-to-load', elapsed)}>
            <p className={styles.counterText}>{elapsed}</p>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default connect(({ elapsed }) => ({ elapsed }), { resetTime })(Header);
