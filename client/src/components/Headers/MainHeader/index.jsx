import React from 'react';
import cx from 'classnames';
import styles from './MainHeader.module.scss';

const MainHeader = (props) => {
  const { className, children } = props;
  
  const classes = cx(
    styles.header,
    className,
    'pb-3 m-0',
  );

  return (
    <h3 className={classes}>{children}</h3>
  );
};

export default MainHeader;
