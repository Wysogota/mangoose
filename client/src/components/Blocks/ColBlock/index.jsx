import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import cx from 'classnames';
import styles from './ColBlock.module.scss';

const ColBlock = ({ className, children }) => {
  const { theme: { bgTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    styles.col,
    className,
  );

  const innerClasses = cx(
    bgTheme,
    'p-3 rounded',
  );

  return (
    <Col className={classes}>
      <div className={innerClasses}>
        {children}
      </div>
    </Col>
  );
};

export default ColBlock;
