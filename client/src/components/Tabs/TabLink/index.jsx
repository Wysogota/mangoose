import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TabLink.module.scss';

const TabLink = (props) => {
  const { to, children } = props;
  return (
    <Link to={`?tab=${to}`} className={styles.tab_link}>{children}</Link>
  );
};

export default TabLink;