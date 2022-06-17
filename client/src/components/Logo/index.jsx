import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
import styles from './Logo.module.scss';

const Logo = () => {
  const { isDarkTheme } = useSelector(({ themes }) => themes);
  return (
    <Link to="/">
      <img
        src={CONSTANTS.STATIC_IMAGE_PATH + (isDarkTheme ? CONSTANTS.LIGHT_LOGO_NAME : CONSTANTS.DARK_LOGO_NAME)}
        className={styles.logo}
      />
    </Link>
  );
};

export default Logo;
