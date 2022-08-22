import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';
import cx from 'classnames';
import CONSTANTS from '../../constants';
const { PAGINATION_PAGES_COUNT } = CONSTANTS;

const PageItems = (props) => {
  const { pageCount, currentPage, onClickHandle } = props;
  const pageItemClasses = (i) => cx((currentPage === i) && 'active');

  const displayCount = pageCount < PAGINATION_PAGES_COUNT ? pageCount : PAGINATION_PAGES_COUNT;
  const leftShift = Math.floor(displayCount / 2);

  const shift = (currentPage + leftShift >= pageCount)
    ? ((displayCount) - (pageCount - currentPage))
    : (currentPage < leftShift) ? currentPage : leftShift;

  return new Array(displayCount).fill(null).map((_, i) => {
    const page = (currentPage + i) - shift;
    return (
      <Pagination.Item key={page}
        className={pageItemClasses(page)}
        onClick={() => onClickHandle(page + 1)}
      >
        {page + 1}
      </Pagination.Item>
    );
  });
};

PageItems.propTypes = {
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClickHandle: PropTypes.func.isRequired,
};

export default PageItems;
