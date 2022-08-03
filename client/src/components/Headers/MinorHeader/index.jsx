import React from 'react';
import cx from 'classnames';

const MinorHeader = (props) => {
  const { className, children } = props;

  const classes = cx(
    className,
    'pb-2 m-0 fs-5',
  );

  return (
    <h3 className={classes}>{children}</h3>
  );
};

export default MinorHeader;
