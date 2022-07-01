import React from 'react';
import cx from 'classnames';

const MainHeader = ({ className, children }) => {
  const classes = cx(
    className,
    'pb-3 m-0',
  );
  
  return (
    <h3 className={classes}>{children}</h3>
  );
};

export default MainHeader;
