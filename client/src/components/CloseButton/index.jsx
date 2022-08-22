import React from 'react';
import { useSelector } from 'react-redux';
import { BsChevronDoubleUp as CloseIcon } from 'react-icons/bs';
import cx from 'classnames';
import elements from '../../common/styles/elements.module.scss';

const CloseButton = (props) => {
  const { theme: { mainTheme } } = useSelector(({ themes }) => themes);

  const classes = cx(
    elements.icon_button,
    'fs-4'
  );

  return (
    <button className={classes} {...props}>
      <CloseIcon className={mainTheme} />
    </button>
  );
};

export default CloseButton;
