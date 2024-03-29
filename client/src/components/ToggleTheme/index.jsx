import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { BsFillMoonFill as DarkTheme, BsMoon as LightTheme } from 'react-icons/bs';
import elements from '../../common/styles/elements.module.scss';
import CONSTANTS from '../../constants';
const { DARK_COLOR } = CONSTANTS;

const ToggleTheme = (props) => {
  const { Component, btnClasses, imageClasses, shouldInverted, children } = props;
  const [hovered, setHovered] = useState(false);
  const { theme: { mainTheme, invertedTheme, mainColor } } = useSelector(({ themes }) => themes);
  const { toggleTheme } = bindActionCreators(actionCreators, useDispatch());

  const btnClass = cx(
    elements.icon_button,
    btnClasses
  );
  const imageClass = cx(
    shouldInverted && hovered ? invertedTheme : mainTheme,
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
      mainColor === DARK_COLOR
        ? (hovered ? <LightTheme className={imageClass} /> : <DarkTheme className={imageClass} />)
        : (hovered ? <DarkTheme className={imageClass} /> : <LightTheme className={imageClass} />),
      children
    )
  );
};

ToggleTheme.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  btnClasses: PropTypes.string,
  imageClasses: PropTypes.string,
  shouldInverted: PropTypes.bool,
  children: PropTypes.any,
};

export default ToggleTheme;
