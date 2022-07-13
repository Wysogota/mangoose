import React from 'react';
import { useSelector } from 'react-redux';
import { BsSearch as SearchIcon } from 'react-icons/bs';
import cx from 'classnames';
import styles from './SearchInput.module.scss';

const SearchInput = () => {

  const { theme: { bgAccentTheme, mainTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    styles.container,
    bgAccentTheme,
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
      <input className={inputClasses} placeholder='Search'></input>
    </div>
  );
};

export default SearchInput;
