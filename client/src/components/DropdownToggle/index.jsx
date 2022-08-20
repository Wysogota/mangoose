import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
const { PAGES: { PROFILE: { path: PROFILE_PATH } } } = CONSTANTS;

const DropdownToggle = (props, ref) => {
  const { children, onClick } = props;

  const onClickHandle = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <Link to={PROFILE_PATH} ref={ref} onClick={onClickHandle}>
      {children}
    </Link>
  );
};

export default forwardRef(DropdownToggle);
