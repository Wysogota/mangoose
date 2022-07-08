import React from 'react';
import cx from 'classnames';
import { BsList as MenuIcon } from 'react-icons/bs';
import elements from '../../../common/styles/elements.module.scss';
import { useSelector } from 'react-redux';

const MenuButton = () => {
  const { theme: { hoveredTheme, mainTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    elements.icon_button,
    mainTheme,
    hoveredTheme,
    'w-100 align-middle'
  );
  return (
    <button className={classes}><span>Menu</span><MenuIcon /></button>
  );
};

export default MenuButton;
