import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import cx from 'classnames';
import styles from './PaginationButtons.module.scss';

const PaginationButtons = (props) => {
  const { itemCount, limit, currentPage, setCurrentPage } = props;
  const pageCount = Math.ceil(itemCount / limit);

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
            to={`?page=${page + 1}`}
            onClick={() => setCurrentPage(page)}
            className='page-link'
          >
            {page + 1}
          </Link>
        </li>
      );
    });
  };

  const startLinkClasses = cx(
    'page-link',
    (currentPage === 0) && styles.disabled,
  );
  const endLinkClasses = cx(
    'page-link',
    (currentPage === pageCount - 1) && styles.disabled,
  );

  const First = () => (
    <li className='page-item'>
      <Link
        to='?page=1'
        onClick={() => setCurrentPage(0)}
        className={startLinkClasses}>
        «
      </Link>
    </li>
  );

  const Prev = () => (
    <li className='page-item'>
      <Link
        to={`?page=${currentPage}`}
        onClick={() => setCurrentPage(current => current - 1)}
        className={startLinkClasses}>
        ‹
      </Link>
    </li>
  );

  const Next = () => (
    <li className='page-item'>
      <Link
        to={`?page=${currentPage + 2}`}
        onClick={() => setCurrentPage(current => current + 1)}
        className={endLinkClasses}>
        ›
      </Link>
    </li>
  );

  const Last = () => (
    <li className='page-item'>
      <Link
        to={`?page=${pageCount}`}
        onClick={() => setCurrentPage(pageCount - 1)}
        className={endLinkClasses}>
        »
      </Link>
    </li>
  );

  return (
    <Pagination className='justify-content-center pt-3'>
      <First />
      <Prev />
      <PageItems />
      <Next />
      <Last />
    </Pagination>
  );
};

export default PaginationButtons;
