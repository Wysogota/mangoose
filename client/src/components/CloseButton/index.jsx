import React from 'react';
import { useSelector } from 'react-redux';
import { BsChevronDoubleUp as CloseIcon } from 'react-icons/bs';
import cx from 'classnames';
import elements from '../../common/styles/elements.module.scss';
import themes from '../../common/styles/theme.module.scss';

const CloseButton = ({ onClick }) => {
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const classes = cx(
    elements.icon_button,
    'fs-4'
  );

  return (
    <button className={classes} onClick={onClick}>
      <CloseIcon className={themes[mainColor]} />
    </button>
  );
};

export default CloseButton;
