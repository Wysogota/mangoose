import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import styles from './InputPage.module.scss';

const InputPage = (props) => {
  const { page, pageCount } = props;
  const { theme: { mainTheme, hoveredTheme } } = useSelector(({ themes }) => themes);
  const [_, setSearchParams] = useSearchParams();

  const handleChange = ({ target }) => {
    let newPage = page;

    if (target.value > pageCount) newPage = pageCount;
    else if (target.value < 0) newPage = 1;
    else newPage = target.value;

    setSearchParams(`?page=${newPage || 1}`);
  };

  const classes = cx(
    styles.input,
    mainTheme,
    hoveredTheme,
    'text-end',
  );

  return (
    <input
      className={classes}
      value={page} type='number'
      onChange={handleChange}
      min='1' max={pageCount}
    />
  );
};

export default InputPage;
