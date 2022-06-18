import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { BsFillMoonFill as DarkTheme, BsMoon as LightTheme } from "react-icons/bs";
import styles from './ToggleTheme.module.scss';
import themes from '../../common/styles/theme.module.scss';

const ToggleTheme = ({ className }) => {
  const { isDarkTheme } = useSelector(({ themes }) => themes);
  const { toggleTheme } = bindActionCreators(actionCreators, useDispatch());

  const classes = cx(
    styles.toggle_button,
    className
  );

  return (
    <button onClick={toggleTheme} className={classes} >
      {isDarkTheme ? <DarkTheme className={themes.dark}/> : <LightTheme className={themes.light}/>}
    </button>
  );
};

export default ToggleTheme;
