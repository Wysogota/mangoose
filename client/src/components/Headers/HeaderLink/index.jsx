import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight as TransitionIcon } from 'react-icons/bs';
import cx from 'classnames';
import elements from '../../../common/styles/elements.module.scss';

const HeaderLink = (props) => {
  const { to, children } = props;
  const { theme: { hoveredTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    hoveredTheme,
    elements.header,
    'd-inline-block m-0 text-nowrap',
  );

  return (
    <div className='d-flex justify-content-between pb-3'>
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
