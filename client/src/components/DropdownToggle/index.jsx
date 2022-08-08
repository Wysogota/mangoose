import React, { forwardRef } from 'react';

const DropdownToggle = (props, ref) => {
  const { children, onClick } = props;

  const onClickHandle = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <a href="" ref={ref} onClick={onClickHandle}>
      {children}
    </a>
  );
};

export default forwardRef(DropdownToggle);
