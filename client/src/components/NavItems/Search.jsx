import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { BsSearch as SearchIcon } from 'react-icons/bs';

const Search = ({ Component, options }) => {
  const { showSearchbar } = bindActionCreators(actionCreators, useDispatch());
  
  return (
    <Component onClick={showSearchbar}><SearchIcon /> Search </Component>
  );
};

export default Search;