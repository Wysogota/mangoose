import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
import CONSTANTS from '../../constants';
const { STATIC_IMAGE_PATH, PAGES: { HOME: { path: HOME_PATH } } } = CONSTANTS;

const Logo = (props) => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  return (
    <Link to={HOME_PATH} {...props}>
      <img
        src={STATIC_IMAGE_PATH + CONSTANTS['LOGO_' + invertedColor.toUpperCase()]}
        className={styles.logo}
      />
    </Link>
  );
};

export default Logo;
