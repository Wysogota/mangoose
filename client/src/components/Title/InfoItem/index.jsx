import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { capitalize, startCase } from 'lodash';
import cx from 'classnames';
import styles from './InfoItem.module.scss';
import CONSTANTS from '../../../constants';
const { DEFAULT_INFO_ITEM } = CONSTANTS;

const InfoItem = (props) => {
  const { to, title, value, inline } = props;
  const { theme: { bgHoveredTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    bgHoveredTheme,
    'ps-3 pe-3 mt-1 mb-1 rounded-2',
    inline ? 'd-flex justify-content-between pt-2 pb-2' : 'd-block'
  );

  const titleClasses = cx(
    !inline && styles.title
  );

  return (
    <Link to={to} className={containerClasses}>
      <div className={titleClasses}>{capitalize(title) + ':'}</div>
      <div>{startCase(value)}</div>
    </Link>
  );
};

InfoItem.defaultProps = {
  value: DEFAULT_INFO_ITEM,
};

InfoItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  inline: PropTypes.bool,
};

export default InfoItem;
