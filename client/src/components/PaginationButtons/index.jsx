import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import cx from 'classnames';
import PageItems from './PageItems';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

const PaginationButtons = (props) => {
  const { paginationName, itemCount, limit } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramName = paginationName ? `${paginationName}-${PAGE}` : PAGE;

  const pageCount = Math.ceil(itemCount / limit);
  const currentPage = (Number.parseInt(searchParams.get(paramName)) - 1) || 0;

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
      <PageItems
        pageCount={pageCount}
        currentPage={currentPage}
        onClickHandle={onClickHandle}
      />
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

PaginationButtons.propTypes = {
  paginationName: PropTypes.string,
  itemCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export default PaginationButtons;
