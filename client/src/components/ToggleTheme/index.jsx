import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { BsFillMoonFill as DarkTheme, BsMoon as LightTheme } from "react-icons/bs";
import styles from './ToggleTheme.module.scss';

const ToggleTheme = ({ className }) => {
  const { isDarkTheme } = useSelector(({ themes }) => themes);
  const { toggleTheme } = bindActionCreators(actionCreators, useDispatch());

  const classes = cx(
    styles.toggle_button,
    isDarkTheme ? styles.dark_theme : styles.light_theme,
    className
  );

  return (
    <button onClick={toggleTheme} className={classes} >
      {isDarkTheme ? <DarkTheme /> : <LightTheme />}
    </button>
  );
};

export default ToggleTheme;
