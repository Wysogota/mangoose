import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { BsSearch as SearchIcon } from 'react-icons/bs';
import styles from './SearchingInput.module.scss';

const SearchingInput = (props) => {
  const { containerClassName, ...inputProps } = props;
  const { theme: { mainTheme, bgAccentTheme, invertedColor } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    styles.container,
    styles[`container-${invertedColor}`],
    bgAccentTheme,
    containerClassName,
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
      <input className={inputClasses} {...inputProps} />
    </div>
  );
};

export default SearchingInput;
