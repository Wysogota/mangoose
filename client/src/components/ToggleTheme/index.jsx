import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { BsFillMoonFill as DarkTheme, BsMoon as LightTheme } from "react-icons/bs";
import styles from './ToggleTheme.module.scss';
import themes from '../../common/styles/theme.module.scss';
import CONSTANTS from '../../constants';

const ToggleTheme = (props) => {
  const { Component, btnClasses, imageClasses, shouldInverted, children } = props;
  const [hovered, setHovered] = useState(false);
  const { theme: { mainColor, invertedColor } } = useSelector(({ themes }) => themes);
  const { toggleTheme } = bindActionCreators(actionCreators, useDispatch());

  const btnClass = cx(
    styles.toggle_button,
    btnClasses
  );
  const imageClass = cx(
    themes[shouldInverted && hovered ? invertedColor : mainColor],
    imageClasses
  );

  return (
    React.createElement(Component,
      {
        onClick: toggleTheme,
        className: btnClass,
        onMouseEnter: () => setHovered(true),
        onMouseLeave: () => setHovered(false)
      },
      mainColor === CONSTANTS.DARK_COLOR ?
        (hovered ? <LightTheme className={imageClass} /> : <DarkTheme className={imageClass} />) :
        (hovered ? <DarkTheme className={imageClass} /> : <LightTheme className={imageClass} />),
      children
    )
  );
};

export default ToggleTheme;
