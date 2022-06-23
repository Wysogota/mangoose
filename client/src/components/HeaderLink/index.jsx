import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight as TransitionIcon } from 'react-icons/bs';
import cx from 'classnames';

const HeaderLink = (props) => {
  const { to, title } = props;
  const { theme: { hoveredTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    hoveredTheme,
    'pb-3'
  );

  return (
    <Link to={to}>
      <h3 className={classes}>
        {title}<TransitionIcon />
      </h3>
    </Link>
  );
};

export default HeaderLink;
