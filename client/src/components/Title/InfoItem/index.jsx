import { capitalize, startCase } from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './InfoItem.module.scss';

const defaultValue = '¯\\_(ツ)_/¯';

const InfoItem = (props) => {
  const { title, value, inline } = props;

  const containerClasses = cx(
    styles.container_item_bg,
    'ps-3 pe-3 mt-1 mb-1 rounded-2',
    inline ? 'd-flex justify-content-between pt-2 pb-2' : 'd-block'
  );

  const titleClasses = cx(
    !inline && styles.title
  );

  return (
    <Link to='#' className={containerClasses}>
      <div className={titleClasses}>{capitalize(title) + ':'}</div>
      <div>{startCase(value) || defaultValue}</div>
    </Link>
  );
};

export default InfoItem;
