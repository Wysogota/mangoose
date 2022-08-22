import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight as TransitionIcon } from 'react-icons/bs';
import cx from 'classnames';
import styles from './Header.module.scss';

const HeaderLink = (props) => {
  const { to, children } = props;
  const { theme: { hoveredTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    styles.header,
    hoveredTheme,
    'd-inline-block m-0 text-nowrap',
  );

  return (
    <div className='d-flex justify-content-between pb-3 w-75'>
      <h3 className={classes}>
        <Link to={to}>
          {children}<TransitionIcon className='fs-4' />
        </Link>
      </h3>
    </div>
  );
};

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default HeaderLink;
