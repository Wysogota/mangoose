import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import cx from 'classnames';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

const PaginationButtons = (props) => {
  const { itemCount, limit, currentPage, setCurrentPage, existedParams, isPageFirst } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const pageCount = Math.ceil(itemCount / limit);

  const getUrl = (page) => existedParams
    ? isPageFirst ? `?${PAGE}=${page}&${existedParams}` : `?${existedParams}&${PAGE}=${page}`
    : `?${PAGE}=${page}`;

  const pageItemClasses = (i) => cx(
    'page-item',
    (currentPage === i) && 'active'
  );

  const PageItems = () => {
    const displayCount = pageCount < 5 ? pageCount : 5;
    const leftShift = Math.floor(displayCount / 2);

    const shift = (currentPage + leftShift >= pageCount)
      ? ((displayCount) - (pageCount - currentPage))
      : (currentPage < leftShift) ? currentPage : leftShift;

    return new Array(displayCount).fill(null).map((_, i) => {
      const page = (currentPage + i) - shift;
      return (
        <li key={page + 1} className={pageItemClasses(page)}>
          <Link
            to={getUrl(page + 1)}
            onClick={() => setCurrentPage(page)}
            className='page-link'
          >
            {page + 1}
          </Link>
        </li>
      );
    });
  };

  const startItemClasses = cx(
    'page-item',
    (currentPage === 0) && 'disabled',
  );
  const endItemClasses = cx(
    'page-item',
    (currentPage === pageCount - 1) && 'disabled',
  );

  const First = () => (
    <li className={startItemClasses}>
      <Link
        to={getUrl(1)}
        onClick={() => setCurrentPage(0)}
        className='page-link'>
        «
      </Link>
    </li>
  );

  const Prev = () => (
    <li className={startItemClasses}>
      <Link
        to={getUrl(currentPage)}
        onClick={() => setCurrentPage(current => current - 1)}
        className='page-link'>
        ‹
      </Link>
    </li>
  );

  const Next = () => (
    <li className={endItemClasses}>
      <Link
        to={getUrl(currentPage + 2)}
        onClick={() => setCurrentPage(current => current + 1)}
        className='page-link'>
        ›
      </Link>
    </li>
  );

  const Last = () => (
    <li className={endItemClasses}>
      <Link
        to={getUrl(pageCount)}
        onClick={() => setCurrentPage(pageCount - 1)}
        className='page-link'>
        »
      </Link>
    </li>
  );

  const paginationClasses = cx(
    'justify-content-center pt-3',
    `pagination-${mainColor}`,
  );

  return (
    <Pagination className={paginationClasses}>
      <First />
      <Prev />
      <PageItems />
      <Next />
      <Last />
    </Pagination>
  );
};

export default PaginationButtons;
