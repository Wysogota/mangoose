import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { BsList as ListIcon } from 'react-icons/bs';
import cx from 'classnames';
import elements from '../../common/styles/elements.module.scss';

const HeaderSidebar = () => {
  const { theme: { mainTheme } } = useSelector(({ themes }) => themes);
  const { showSidebar } = bindActionCreators(actionCreators, useDispatch());

  const classes = cx(
    elements.icon_button,
    'fs-1'
  );

  return (
    <button className={classes} onClick={showSidebar}>
      <ListIcon className={mainTheme} />
    </button>
  );
};

export default HeaderSidebar;