import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import cx from 'classnames';
import styles from './ColBlock.module.scss'

const ColBlock = ({ children }) => {
  const { theme: { bgTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    bgTheme,
    styles.col,
    'rounded'
  );

  return (
    <Col className={classes}>
      {children}
    </Col>
  );
};

export default ColBlock;
