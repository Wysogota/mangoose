import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import styles from './InputPage.module.scss';
import CONSTANTS from '../../../constants.js';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

const InputPage = (props) => {
  const { page, className } = props;
  const { theme: { mainTheme, hoveredTheme } } = useSelector(({ themes }) => themes);
  const { total } = useSelector(({ chapterPages }) => chapterPages);
  const [, setSearchParams] = useSearchParams();

  const handleChange = ({ target }) => {
    let newPage = page;

    if (target.value > total) newPage = total;
    else if (target.value < 0) newPage = 1;
    else newPage = target.value;

    setSearchParams({ [PAGE]: newPage || 1 }, { replace: true });
  };

  const classes = cx(
    styles.input,
    mainTheme,
    hoveredTheme,
    className,
    'text-end',
  );

  return (
    <input
      className={classes}
      value={page} type='number'
      onChange={handleChange}
      min='1' max={total}
    />
  );
};

InputPage.propTypes = {
  page: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default InputPage;
