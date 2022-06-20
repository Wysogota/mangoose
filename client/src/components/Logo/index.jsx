import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
import styles from './Logo.module.scss';

const Logo = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  return (
    <Link to="/">
      <img
        src={CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS['LOGO_' + invertedColor.toUpperCase()]}
        className={styles.logo}
      />
    </Link>
  );
};

export default Logo;
