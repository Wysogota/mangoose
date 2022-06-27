import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import cx from 'classnames';
import styles from './ColBlock.module.scss';

const ColBlock = (props, ref) => {
  const { className, innerClassName, children } = props;
  const { theme: { bgTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    styles.col,
    className,
  );

  const innerClasses = cx(
    bgTheme,
    innerClassName,
    'p-3 rounded',
  );

  return (
    <Col className={classes} ref={ref}>
      <div className={innerClasses}>
        {children}
      </div>
    </Col>
  );
};

export default forwardRef(ColBlock);
