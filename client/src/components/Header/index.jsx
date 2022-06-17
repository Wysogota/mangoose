import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import Logo from '../Logo';
import styles from './Header.module.scss';
import ToggleTheme from '../ToggleTheme';

const Header = () => {

  const { isDarkTheme } = useSelector(({ themes }) => themes);

  const classes = cx(
    styles.header,
    isDarkTheme ? styles.dark_theme : styles.light_theme
  );

  return (
    <div className={classes}>
      <Logo />
      <ToggleTheme />
    </div>
  );
};

export default Header;
