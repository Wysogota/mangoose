import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import cx from 'classnames';
import styles from './ColBlock.module.scss';

const ColBlock = (props) => {
  const { className, innerClassName, children, onClick } = props;
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
    <Col className={classes} onClick={onClick}>
      <div className={innerClasses}>
        {children}
      </div>
    </Col>
  );
};

ColBlock.propTypes = {
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
};

export default ColBlock;
