import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight as TransitionIcon } from 'react-icons/bs';
import cx from 'classnames';
import elements from '../../common/styles/elements.module.scss';

const HeaderLink = (props) => {
  const { to, title, children } = props;
  const { theme: { hoveredTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    hoveredTheme,
    elements.header,
    'd-inline-block m-0 text-nowrap',
  );

  return (
    <div className='d-flex justify-content-between pb-3'>
      <Link to={to} >
        <h3 className={classes}>
          {title}<TransitionIcon className='fs-4' />
        </h3>
      </Link>
      {children}
    </div>
  );
};

export default HeaderLink;
