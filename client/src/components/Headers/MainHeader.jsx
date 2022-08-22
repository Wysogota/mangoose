import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Header.module.scss';

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

MainHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default MainHeader;
