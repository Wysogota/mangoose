import React from 'react';
import { useSelector } from 'react-redux';
import { BsList as ListIcon } from 'react-icons/bs';
import cx from 'classnames';
import elements from '../../common/styles/elements.module.scss';
import themes from '../../common/styles/theme.module.scss';

export default function HeaderSidebar() {
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const classes = cx(
    elements.icon_button,
    'fs-1'
  )

  return (
    <button className={classes}>
      <ListIcon className={themes[mainColor]} />
    </button>
  );
}
