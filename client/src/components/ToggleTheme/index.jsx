import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { BsFillMoonFill as DarkTheme, BsMoon as LightTheme } from "react-icons/bs";
import styles from './ToggleTheme.module.scss';
import themes from '../../common/styles/theme.module.scss';
import CONSTANTS from '../../constants';

const ToggleTheme = ({ className }) => {
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const { toggleTheme } = bindActionCreators(actionCreators, useDispatch());

  const classes = cx(
    styles.toggle_button,
    className
  );

  return (
    <button onClick={toggleTheme} className={classes} >
      {mainColor === CONSTANTS.DARK_COLOR ?
        <DarkTheme className={themes[mainColor]} /> :
        <LightTheme className={themes[mainColor]} />}
    </button>
  );
};

export default ToggleTheme;
