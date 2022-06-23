import React from 'react';
import { Row } from 'react-bootstrap';
import cx from 'classnames';
import styles from './RowBlock.module.scss';

const RowBlock = ({ children }) => {
  const classes = cx(
    styles.row,
    'p-2'
  );

  return (
    <Row className={classes}>
      {children}
    </Row>
  );
};

export default RowBlock;
