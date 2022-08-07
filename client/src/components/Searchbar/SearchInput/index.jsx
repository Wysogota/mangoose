import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import SearchingInput from '../../SearchingInput';

const SearchInput = (props) => {
  const { limit, autoFocus, className } = props;
  const { inputValue } = useSelector(({ mangaSearch }) => mangaSearch);
  const { getMangaSearch, setSearchValue } = bindActionCreators(actionCreators, useDispatch());

  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
    getMangaSearch({ title: value, limit });
  };

  return (
    <SearchingInput
      containerClassName={className}
      data-name='searchInput'
      placeholder='Search'
      onChange={handleChange}
      value={inputValue}
      autoFocus={autoFocus}
    />
  );
};

export default SearchInput;
