import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { BsSearch as SearchIcon } from 'react-icons/bs';

const Search = ({ Component, options }) => {
  const { isSearchbarOpen } = useSelector(({ modalItems }) => modalItems);
  const { showSearchbar, hideSearchbar } = bindActionCreators(actionCreators, useDispatch());
  const OnClickHandle = () => isSearchbarOpen ? hideSearchbar() : showSearchbar();

  return (
    <Component onClick={OnClickHandle}><SearchIcon /> Search </Component>
  );
};

export default Search;