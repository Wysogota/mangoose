import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { useSearchParams } from 'react-router-dom';
import { BsSearch as SearchIcon } from 'react-icons/bs';
import cx from 'classnames';
import styles from './SearchInput.module.scss';
import CONSTANTS from '../../../constants';
const { PARAM_NAME: { FILTER: { TITLE } } } = CONSTANTS;

const SearchInput = (props) => {
  const { limit, className } = props;
  const { theme: { bgAccentTheme, mainTheme, invertedColor } } = useSelector(({ themes }) => themes);
  const { inputValue } = useSelector(({ mangaSearch }) => mangaSearch);
  const { getMangaSearch, setSearchValue } = bindActionCreators(actionCreators, useDispatch());
  const [searchParams] = useSearchParams();

  useEffect(() => setSearchValue(searchParams.get(TITLE)), []);

  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
    getMangaSearch({ title: value, limit });
  };

  const containerClasses = cx(
    styles.container,
    styles[`container-${invertedColor}`],
    bgAccentTheme,
    className,
    'rounded-2 d-flex align-items-center',
  );

  const inputClasses = cx(
    styles.input,
    mainTheme,
    'flex-grow-1 me-2',
  );

  return (
    <div className={containerClasses}>
      <SearchIcon className='ms-2 me-2' />
      <input
        data-name='searchInput'
        className={inputClasses}
        placeholder='Search'
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};

export default SearchInput;
