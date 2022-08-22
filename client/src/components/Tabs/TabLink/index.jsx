import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './TabLink.module.scss';
import CONSTANTS from '../../../constants';
const { PARAM_NAME: { TAB } } = CONSTANTS;

const TabLink = (props) => {
  const { to, children } = props;
  return (
    <Link to={`?${TAB}=${to}`} className={styles.tab_link}>{children}</Link>
  );
};

TabLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default TabLink;