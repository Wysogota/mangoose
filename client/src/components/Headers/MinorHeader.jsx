import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Header.module.scss';

const MinorHeader = (props) => {
  const { className, children } = props;

  const classes = cx(
    styles.header,
    className,
    'pb-2 m-0 fs-5',
  );

  return (
    <h3 className={classes}>{children}</h3>
  );
};

MinorHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default MinorHeader;
