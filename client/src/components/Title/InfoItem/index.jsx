import { capitalize, startCase } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './InfoItem.module.scss';

const defaultValue = '¯\\_(ツ)_/¯';

const InfoItem = (props) => {
  const { title, value } = props;
  const containerClasses = cx(
    styles.container_item_bg,
    'ps-3 pe-3 mt-1 mb-1 d-block rounded-2'
  );
  return (
    <Link to='#' className={containerClasses}>
      <div className={styles.title}>{capitalize(title) + ':'}</div>
      <div>{startCase(value) || defaultValue}</div>
    </Link>
  );
};

export default InfoItem;
