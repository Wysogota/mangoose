import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useLocation } from 'react-router-dom';
import { BsSearch as SearchIcon } from 'react-icons/bs';
import CONSTANTS from '../../constants';
const { PAGES: { CATALOG: { path } } } = CONSTANTS;

const Search = ({ Component, options }) => {
  const { isSearchbarOpen } = useSelector(({ modalItems }) => modalItems);
  const { showSearchbar, hideSearchbar } = bindActionCreators(actionCreators, useDispatch());
  const location = useLocation();
  
  const OnClickHandle = () => {
    const onCatalogPage = () => {
      document.querySelector('[data-name="searchInput"]').focus();
      window.scrollTo(0, 0);
    };

    isSearchbarOpen
      ? hideSearchbar()
      : (location.pathname === path) ? onCatalogPage() : showSearchbar();
  };

  return (
    <Component onClick={OnClickHandle}><SearchIcon /> Search </Component>
  );
};

export default Search;