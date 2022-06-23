import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './CarouselHeader.module.scss';

const CarouselHeader = (props) => {
  const { to, className, shouldInvertedHovered, children } = props;
  const { theme: { invertedHoveredTheme, hoveredTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    styles.header,
    shouldInvertedHovered ? invertedHoveredTheme : hoveredTheme,
    className,
  );
  return (
    <Link to={to}><h3 className={classes}>{children}</h3></Link>
  );
};

export default CarouselHeader;
