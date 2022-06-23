import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { BsChevronDoubleDown as OpenIcon, BsChevronContract as CloseIcon } from 'react-icons/bs';
import elements from '../../../common/styles/elements.module.scss';
import './minimize.css';

const MinimizeButton = (props) => {
  const { isOpen, toggleCarousel, carouselRef } = props;
  const { theme: { mainTheme, hoveredTheme } } = useSelector(({ themes }) => themes);

  const classes = cx(
    elements.icon_button,
    mainTheme,
    hoveredTheme,
    'fs-4',
    !isOpen && 'hide',
  );

    const onClickHandle = (e)=>{
      toggleCarousel();
      carouselRef.current.classList.toggle('hide');
    }

  return (
    <button className={classes} onClick={onClickHandle}>
      {isOpen ? <CloseIcon /> : <OpenIcon />}
    </button>
  );
};

export default MinimizeButton;
