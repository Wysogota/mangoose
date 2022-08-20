import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import cx from 'classnames';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

const PaginationButtons = (props) => {
  const { itemCount, paginationName, limit } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramName = paginationName ? `${paginationName}-${PAGE}` : PAGE;

  const pageCount = Math.ceil(itemCount / limit);
  const currentPage = (Number.parseInt(searchParams.get(paramName)) - 1) || 0;

  const pageItemClasses = (i) => cx((currentPage === i) && 'active');
  const startItemClasses = cx((currentPage === 0) && 'disabled');
  const endItemClasses = cx((currentPage === pageCount - 1) && 'disabled');
  const paginationClasses = cx(
    'justify-content-center pt-3',
    `pagination-${mainColor}`,
  );

  const onClickHandle = (searchParam) => {
    searchParams.set(paramName, searchParam);
    setSearchParams(searchParams, { replace: true });
  };

  const PageItems = () => {
    const displayCount = pageCount < 5 ? pageCount : 5;
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

  return (
    <Pagination className={paginationClasses}>
      <Pagination.First
        onClick={() => onClickHandle(1)}
        className={startItemClasses}
      />
      <Pagination.Prev
        onClick={() => onClickHandle(currentPage)}
        className={startItemClasses}
      />
      <PageItems />
      <Pagination.Next
        onClick={() => onClickHandle(currentPage + 2)}
        className={endItemClasses}
      />
      <Pagination.Last
        onClick={() => onClickHandle(pageCount)}
        className={endItemClasses}
      />
    </Pagination>
  );
};

export default PaginationButtons;
